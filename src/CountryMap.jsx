import React, { useEffect, useRef, useState, useContext } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CountryState } from './CountryState';

const CountryMap = () => {
  const { selectedCountry } = useContext(CountryState);
  const [data, setData] = useState(null);
  const mapRef = useRef(null);
  const geojsonLayerRef = useRef(null);

  useEffect(() => {
    mapRef.current = L.map('map', {
      center: [20, 0],
      zoom: 1,
      minZoom: 2,
      maxZoom: 8,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapRef.current);
    getData();

    return () => {
      if (geojsonLayerRef.current) {
        mapRef.current.removeLayer(geojsonLayerRef.current);
      }
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    if (data && selectedCountry) {
      highlightCountry(selectedCountry);
    }
  }, [data, selectedCountry]);

  const getData = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
      );
      const jsonData = await response.json();
      setData(jsonData);
      geojsonLayerRef.current = createGeoJSONLayer(jsonData);
      geojsonLayerRef.current.addTo(mapRef.current);
    } catch (error) {
      console.error('Error fetching:', error);
    }
  };

  const createGeoJSONLayer = (data) => {
    return L.geoJSON(data, {
      style: {
        color: 'gray',
        weight: 1,
        fillOpacity: 0.3,
      },
    });
  };

  const highlightCountry = (countryName) => {
    if (geojsonLayerRef.current) {
      mapRef.current.removeLayer(geojsonLayerRef.current);
    }

    geojsonLayerRef.current = L.geoJSON(data, {
      style: (feature) => ({
        color: feature.properties.ADMIN === countryName ? 'red' : 'gray',
        weight: feature.properties.ADMIN === countryName ? 3 : 1,
        fillOpacity: feature.properties.ADMIN === countryName ? 0.5 : 0.3,
      }),
      onEachFeature: (feature, layer) => {
        layer.bindPopup(feature.properties.ADMIN);
      },
    });

    geojsonLayerRef.current.addTo(mapRef.current);

    const selectedFeature = data.features.find(
      (feature) => feature.properties.ADMIN === countryName,
    );
    if (selectedFeature) {
      const bounds = L.geoJSON(selectedFeature).getBounds();
      mapRef.current.fitBounds(bounds);
    }
  };

  return <div id="map" style={{ height: '600px', width: '100%' }}></div>;
};

export default CountryMap;
