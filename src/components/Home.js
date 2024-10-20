// src/components/Home.js

import React, { useState } from 'react';
import SideBar from './SideBar';
import TopBar from './TopBar'; 
import ServiceView from './ServiceView';
import BlockUsers from './BlockUsers';
import TwitSnapsView from './TwitSnapsView';
import ProfileView from './ProfileView'; 
import '../styles/Home.css';

const Home = () => {
  const [currentSection, setCurrentSection] = useState('services');
  const userEmail = localStorage.getItem('email');

  const handleLogout = () => {
    console.log("Cerrando sesión");
  };

  const handleProfileClick = () => {
    setCurrentSection('profile');
  };

  return (
    <div className="home-container">
      <TopBar onProfileClick={handleProfileClick} /> {/* Usa el componente TopBar aquí */}
      <SideBar onSelect={setCurrentSection} currentSection={currentSection} />
      <main className="content">
        {currentSection === 'services' && <ServiceView />}
        {currentSection === 'users' && <BlockUsers />}
        {currentSection === 'twitsnaps' && <TwitSnapsView />}
        {currentSection === 'profile' && (
          <ProfileView email={userEmail} onLogout={handleLogout} />
        )}
      </main>
    </div>
  );
};

export default Home;
