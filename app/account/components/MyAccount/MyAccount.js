import React, { useState, useEffect } from 'react';
import HomeTab from './Home/Tab';
import EventHostTab from './EventHost/Tab';
import LevelsTab from './Levels/Tab';
import GetInvolvedTab from './GetInvolved/Tab';
import HackathonOrganizerTab from './HackathonOrganizer/Tab';

const { API_URL_PROD } = require('../../../config/config');

function MyAccount({ userEmail }) {
  const [badges, setBadges] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [organizingHackathons, setOrganizingHackathons] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/get_badges`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),
        });
        const data = await response.json();
        setBadges(data);
      } catch (error) {
        console.error('Error fetching badges:', error);
      }
    };

    const fetchHackathons = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/get_hackathons`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const hackathons = await response.json();
        const userHackathons = hackathons.filter(hackathon =>
          hackathon.published && hackathon.organizer_emails_list.includes(userEmail)
        );
        setOrganizingHackathons(userHackathons);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
      }
    };

    fetchBadges();
    fetchHackathons();
  }, [userEmail]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="tabs flex flex-wrap justify-center">
        <div className="hidden md:block bg-blue-500 flex-grow"></div>
        <button onClick={() => setActiveTab('home')} className="px-3 md:px-10 py-2 bg-blue-500">Home</button>
        <button onClick={() => setActiveTab('levels')} className="px-3 md:px-10 py-2 bg-green-500">Levels</button>
        <button onClick={() => setActiveTab('getInvolved')} className="px-3 md:px-10 py-2 bg-red-500">Participate</button>
        {badges.some(badge => badge.badge_name.toLowerCase() === 'event host') && (
          <button onClick={() => setActiveTab('eventHost')} className="px-3 md:px-10 py-2 bg-yellow-500">Event Host</button>
        )}
        {organizingHackathons.map(hackathon => (
          <button key={hackathon.id} onClick={() => setActiveTab(`hackathonOrganizer_${hackathon.id}`)} className="px-3 md:px-10 py-2 bg-yellow-500">{hackathon.name}</button>
        ))}
        <div className="bg-yellow-500 flex-grow"></div>
      </div>
      {/* Make a separate flex row for additional tabs if needed */}

      {activeTab === 'home' && <HomeTab userEmail={userEmail} />}
      {activeTab === 'levels' && <LevelsTab userEmail={userEmail} />}
      {activeTab === 'getInvolved' && <GetInvolvedTab userEmail={userEmail} />}
      {activeTab === 'eventHost' && <EventHostTab userEmail={userEmail} />}
      {organizingHackathons.map(hackathon => (
        activeTab === `hackathonOrganizer_${hackathon.id}` && <HackathonOrganizerTab key={hackathon.id} userEmail={userEmail} hackathonId={hackathon.id} />
      ))}
    </div>
  );
}

export default MyAccount;
