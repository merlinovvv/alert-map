import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApiData() {
  const [states, setStates] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl =
      process.env.REACT_APP_API_URL || 'https://alerts.in.ua/api/states';
    const wsUrl =
      process.env.REACT_APP_WS_URL || 'wss://alerts.in.ua/socket/alerts';
    const apiKey = process.env.REACT_APP_APIKEY;

    let ws;

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Accept: 'application/json',
            ...(apiKey ? { 'X-API-Key': apiKey } : {}),
          },
        });
        setStates(response.data.states);
        setLastUpdate(response.data.last_update);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data', error);
        setLoading(false);
      }
    };

    fetchData();

    if ('WebSocket' in window) {
      ws = new WebSocket(apiKey ? `${wsUrl}?apiKey=${apiKey}` : wsUrl);
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (Array.isArray(data.states)) {
            setStates(data.states);
          } else if (data.id) {
            setStates((prev) =>
              prev.map((s) => (s.id === data.id ? { ...s, ...data } : s))
            );
          }
          if (data.last_update) {
            setLastUpdate(data.last_update);
          }
        } catch (err) {
          console.error('Failed to parse WebSocket message', err);
        }
      };
      ws.onerror = (err) => console.error('WebSocket error', err);
    } else {
      const intervalId = setInterval(fetchData, 15000);
      return () => clearInterval(intervalId);
    }

    return () => {
      if (ws) ws.close();
    };
  }, []);

  return { states, loading, lastUpdate };
}
