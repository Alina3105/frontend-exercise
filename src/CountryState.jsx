import React, { createContext, useState } from 'react';

export const CountryState = createContext();
export const CountryProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <CountryState.Provider
      value={{ selectedCountry, setSelectedCountry, searchTerm, setSearchTerm }}
    >
      {children}
    </CountryState.Provider>
  );
};
