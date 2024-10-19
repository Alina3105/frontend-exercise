import { useEffect, useState } from 'react';
import './App.css';
import CountryMap from './CountryMap';
import CountriesView from './CountriesView';
import { CountryProvider } from './CountryState';
import { CircularProgress } from '@mui/material';
import { fetchCountries } from './FetchCountries';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const countries = localStorage.getItem('listCountry');
    if (countries) {
      setData(JSON.parse(countries));
    } else {
      fetchCountries(setData);
    }
  }, []);

  return (
    <CountryProvider>
      <div>
        {!data ? (
          <CircularProgress color="secondary" />
        ) : (
          <>
            <CountriesView data={data} />
            <CountryMap />
          </>
        )}
      </div>
    </CountryProvider>
  );
}

export default App;
