import React, { useState, useEffect } from 'react';
import ProfileInfo from './ProfileInfo';
import Badges from './Badges';
import MiniEvents from './MiniEvents';
import Tasks from './Tasks';
import Certificates from './Certificates';
import Levels from './Levels';
import CreativeCollectives from './CreativeCollectives';
import EventHostDashboard from '../EventHost/Dashboard';

const { API_URL_PROD } = require('../../../config/config');

function MyAccount({ userEmail }) {
  const [badges, setBadges] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');

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
      <div className="tabs flex justify-centerr">
        <button onClick={() => setActiveTab('profile')} className="px-4 py-2">Profile</button>
        {badges.some(badge => badge.badge_name.toLowerCase() === 'event host') && (
          <button onClick={() => setActiveTab('eventHost')} className="px-4 py-2">Event Host Dashboard</button>
        )}
      </div>
      {activeTab === 'profile' && (
        <div className="flex flex-col md:flex-row">
          <div className="md:flex-1">
            <ProfileInfo userEmail={userEmail} />
            <Levels userEmail={userEmail} />
            <Tasks userEmail={userEmail} />
            <CreativeCollectives userEmail={userEmail} />
          </div>
          <div className="md:flex-1">
            <div className="border border-black border-3">
              <MiniEvents />
            </div>
            <Badges userEmail={userEmail} />
            <Certificates userEmail={userEmail} />
          </div>
        </div>
      )}
      {activeTab === 'eventHost' && (
        <EventHostDashboard userEmail={userEmail} />
      )}
    </div>
  );
}

export default MyAccount;
