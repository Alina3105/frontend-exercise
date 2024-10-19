export const fetchCountries = async (setData) => {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,languages,idd,flags',
    );
    const jsonData = await response.json();
    jsonData.sort((a, b) => a.name.common.localeCompare(b.name.common));
    localStorage.setItem('listCountry', JSON.stringify(jsonData));
    setData(jsonData);
  } catch (error) {
    console.error('Error fetching:', error);
  }
};
