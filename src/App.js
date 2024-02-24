// App.js

import React, { useState, useEffect } from 'react';
import PlanetCard from './components/PlanetCard';
import Resident from './components/Resident';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPlanet , setcurrentPlanet] = useState();
  const [residentsData , setResidentsData] = useState();

  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets/?format=json');
    handleScreenWidth();
    window.addEventListener('resize', handleScreenWidth);
    return () => {
      window.removeEventListener('resize', handleScreenWidth);
    };
  }, []);

  const fetchPlanets = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPlanets(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  const handleScreenWidth = () => {
    if (window.innerWidth <= 768) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  };

  const loadNextPage = () => {
    if (nextPage) {
      fetchPlanets(nextPage);
    }
  };
  const loadPrevPage = () => {
    if (prevPage) {
      fetchPlanets(prevPage);
    }
  };

  return (
    <div className="app">
      <h1>STAR WARS PLANETS</h1>
      <p>Click a planet card to view their residents</p>
      <div className="planet-container">
        {planets.map((planet, index) => (
          <PlanetCard key={index} planet={planet} isMobileView={isMobileView}
           setShowPopup={setShowPopup} setcurrentPlanet={setcurrentPlanet} setResidentsData={setResidentsData}/>
        ))}
      </div>
      {prevPage && (
        <button className="load-more-btn" onClick={loadPrevPage}>
          previous Page
        </button>
      )}
      {nextPage && (
        <button className="load-more-btn" onClick={loadNextPage}>
          Next Page
        </button>
      )}
      {showPopup && !isMobileView && (
        <>
        <div className='background-dim' onClick={()=>setShowPopup(false)}></div>
        <div className='residents-popup'>
            <h2>{currentPlanet.name}</h2>
            <div>
            <h2>Residents</h2>
            <ul>
              {residentsData.map((resident, index) => (
                <Resident key={index} resident={resident} />
              ))}
            </ul>
          </div>
        </div>
        </>
      )}

    </div>
  );
}

export default App;
