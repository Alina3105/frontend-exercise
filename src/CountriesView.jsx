import React, { useContext, useEffect, useState } from 'react';
import { CountryState } from './CountryState';
import { Pagination } from '@mui/material';
import CountryCard from './CountryCard';
import SearchBar from './SearchBar';

const CountriesView = ({ data }) => {
  const { setSelectedCountry, searchTerm, setSearchTerm } =
    useContext(CountryState);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 5;
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = data.slice(indexOfFirstCountry, indexOfLastCountry);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries = data.filter((country) =>
    country.name.common
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase()),
  );

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {filteredCountries
        .slice(indexOfFirstCountry, indexOfLastCountry)
        .map((d) => (
          <CountryCard
            key={d.name.common}
            country={d}
            onClick={() => handleCountryClick(d.name.common)}
          />
        ))}
      <Pagination
        style={{ display: 'flex', justifyContent: 'center' }}
        count={Math.ceil(filteredCountries.length / countriesPerPage)}
        variant="outlined"
        color="secondary"
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default CountriesView;
