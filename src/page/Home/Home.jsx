import { useState } from 'react';
import useApiData from '../../hooks/useApiData';
import Map from '../../components/map/Map';
import styleHome from './style.module.css';
import Loader from '../../components/Loader/Loader';
import Info from '../../components/Info/Info';

function Home() {
  const { states, loading } = useApiData();

  const [selectedState, setSelectedState] = useState(null);

  const handleClick = (event) => {
    const { target } = event;
    console.log('Clicked path ID:', target.id);
    // передача данных через props
    setSelectedState(target.id);
  };

  return (
    <div className={styleHome.main}>
      {loading ? (
        <Loader />
      ) : (
        <div className={styleHome.content}>
          <Map states={states} data={selectedState} onClick={handleClick} />
          {selectedState && <Info states={states} data={selectedState} />}
        </div>
      )}
    </div>
  );
}

export default Home;
