// PlanetCard.js

import React, { useState, useEffect } from 'react';
import Resident from './Resident';
import './planetCard.css';

function PlanetCard({ planet , isMobileView , setShowPopup , setcurrentPlanet , setResidentsData}) {
  const [showResidents, setShowResidents] = useState(false);
  const [residents, setResidents] = useState([]);
  

  useEffect(() => {
    if (showResidents) {
      fetchResidents();
    }
  }, [showResidents]);

  const fetchResidents = async () => {
    try {
      const fetchResidentsData = await Promise.all(
        planet.residents.map(async (residentURL) => {
          const response = await fetch(residentURL);
          return response.json();
        })
      );
      setResidents(fetchResidentsData);
    } catch (error) {
      console.error('Error fetching residents:', error);
    }
  };

  const toggleResidents = () => {
    setShowResidents(!showResidents);
    setShowPopup(true);
    setcurrentPlanet(planet);
    setResidentsData(residents);
  };

  return (
    <div className="planet-card" onClick={toggleResidents}>
      <h2>{planet.name}</h2>
      <p>Climate: {planet.climate}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>
      {isMobileView && showResidents && (
          <div>
            <h3>Residents:</h3>
            <ul>
              {residents.map((resident, index) => (
                <Resident key={index} resident={resident} />
              ))}
            </ul>
          </div>
      )}
    </div>
  );
}

export default PlanetCard;
