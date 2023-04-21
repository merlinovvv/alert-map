import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApiData() {
  const [states, setStates] = useState([]);
  const [lastUpdate, setLastUpdate] = useState([]);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://alerts.com.ua/api/states', {
          headers: {
            'X-API-Key': process.env.REACT_APP_APIKEY,
          },
        });
        setStates(response.data.states);
        setLastUpdate(response.data.last_update);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();

    console.log('Данные загружены!');
    const intervalId = setInterval(() => {
      fetchData();
      console.log('Обновлено!');
    }, 15000);
    return () => clearInterval(intervalId);
  }, [setStates, setLastUpdate]);

  return { states, loading, lastUpdate };
}
