import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid gray;
  border-radius: 8px;
  margin: 10px 20px 10px 10px;
  width: 99%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  cursor: pointer;
`;
const Img = styled.img`
  height: 50px;
  width: 70px;
  margin-right: 10px;
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
`;
const SmallText = styled.p`
  margin: 0;
`;
const CountryCard = ({ country, onClick }) => {
  return (
    <Container
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.01)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <Img src={country.flags.png} alt={`${country.name.common} flag`} />
      <Text>
        <SmallText>Country: {country.name.common}</SmallText>
        <SmallText>Telephone Codes: {country.idd.root}</SmallText>
        <SmallText>
          Languages: {Object.values(country.languages).join(', ')}
        </SmallText>
      </Text>
    </Container>
  );
};

export default CountryCard;
