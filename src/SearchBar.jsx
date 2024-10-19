import React from 'react';
import styled from 'styled-components';
const Input = styled.input`
  font-family: 'Bebas Neue', serif;
  width: 15%;
  margin-left: auto;
  border: 1px solid #9c27b0;
  border-radius: 7px;
  height: 25px;
  margin: 10px;
  font-weight: 400;
  font-style: normal;
`;
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <Input
      type="text"
      placeholder="Search for a country"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;
