'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const { API_URL_PROD } = require('../config/config');

const Hackathons = () => {
  const { isLoggedIn, userEmail } = useAuth();
  const [hackathons, setHackathons] = useState([]);
  const [applications, setApplications] = useState({});

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await fetch(`${API_URL_PROD}/get_hackathons`);
        const data = await res.json();
        setHackathons(data);
        if (isLoggedIn) {
          data.forEach(hackathon => fetchApplications(hackathon.id));
        }
      } catch (error) {
        console.error('Error fetching hackathons:', error);
      }
    };

    const fetchApplications = async (hackathonId) => {
      try {
        const res = await fetch(`${API_URL_PROD}/get_applications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ hackathon_id: hackathonId })
        });
        const data = await res.json();
        console.log('Applications:', data);
        const userApplication = data.find(app => app.email === userEmail);
        if (userApplication) {
          setApplications((prev) => ({
            ...prev,
            [hackathonId]: userApplication.status
          }));
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchHackathons();
  }, [isLoggedIn, userEmail]);

  const applyForHackathon = async (hackathon_id) => {
    try {
      await fetch(`${API_URL_PROD}/add_application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          hackathon_id,
          email: userEmail
        })
      });
      setApplications((prev) => ({
        ...prev,
        [hackathon_id]: 'Applied'
      }));
    } catch (error) {
      console.error('Error applying for hackathon:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Upcoming Hackathons</h1>
      <div className="flex flex-wrap gap-4">
        {hackathons.map((hackathon) => (
          <div key={hackathon.id} className="border border-gray-300 p-4 rounded-lg w-80">
            <h2 className="text-xl font-semibold mb-2">{hackathon.name}</h2>
            <p className="mb-2">{hackathon.description}</p>
            <p className="mb-4">{hackathon.start_date} - {hackathon.end_date}</p>
            {isLoggedIn ? (
              applications[hackathon.id] ? (
                <p className="text-green-600 font-semibold">Status: {applications[hackathon.id]}</p>
              ) : (
                <button 
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" 
                  onClick={() => applyForHackathon(hackathon.id)}
                >
                  Apply
                </button>
              )
            ) : (
              <p className="text-red-600">Please sign in to apply</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hackathons;
