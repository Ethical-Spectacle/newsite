import React, { useState, useEffect } from 'react';
import HomeTab from './Home/Tab';
import EventHostTab from './EventHost/Tab';
import LevelsTab from './Levels/Tab';
import GetInvolvedTab from './GetInvolved/Tab';

const { API_URL_PROD } = require('../../../config/config');

function MyAccount({ userEmail }) {
  const [badges, setBadges] = useState([]);
  const [activeTab, setActiveTab] = useState('home');

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

    fetchBadges();
  }, [userEmail]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="tabs flex md:justify-center">
        <div className="hidden md:block bg-blue-500 flex-grow"></div>
        <button onClick={() => setActiveTab('home')} className="px-3 md:px-10 py-2 bg-blue-500">Home</button>
        <button onClick={() => setActiveTab('levels')} className="px-3 md:px-10 py-2 bg-green-500">Levels</button>
        <button onClick={() => setActiveTab('getInvolved')} className="px-3 md:px-10 py-2 bg-red-500">Participate</button>
        {badges.some(badge => badge.badge_name.toLowerCase() === 'event host') && (
          <button onClick={() => setActiveTab('eventHost')} className="px-3 md:px-10 py-2 bg-yellow-500">Event Host</button>
        )}
        <div className="bg-yellow-500 flex-grow"></div>
      </div>
      {/* make a seperate flex row for additional tabs */}

      {activeTab === 'home' && (
        <HomeTab userEmail={userEmail} />
      )}

      {activeTab === 'levels' && (
        <LevelsTab userEmail={userEmail} />
      )}

      {activeTab === 'getInvolved' && (
        <GetInvolvedTab userEmail={userEmail} />
      )}

      {activeTab === 'eventHost' && (
        <EventHostTab userEmail={userEmail} />
      )}
    </div>
  );
}

export default MyAccount;
