'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaArrowRight } from 'react-icons/fa';

const { API_URL_PROD } = require('../config/config');

const Hackathons = () => {
  const { isLoggedIn, userEmail } = useAuth();
  const [hackathons, setHackathons] = useState([]);
  const [applications, setApplications] = useState({});
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await fetch(`${API_URL_PROD}/get_hackathons`);
        const data = await res.json();
        const publishedHackathons = data.filter(hackathon => hackathon.published === 1);
        setHackathons(publishedHackathons);
        if (isLoggedIn) {
          publishedHackathons.forEach(hackathon => fetchApplications(hackathon.id));
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
      const response = await fetch(`${API_URL_PROD}/add_application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          hackathon_id,
          email: userEmail
        })
      });
      if (response.ok) {
        setApplications((prev) => ({
          ...prev,
          [hackathon_id]: 'Applied'
        }));
        setErrorMessages((prev) => ({
          ...prev,
          [hackathon_id]: '' // Clear error message on successful application
        }));
      } else {
        const errorText = await response.text();
        setErrorMessages((prev) => ({
          ...prev,
          [hackathon_id]: errorText
        }));
      }
    } catch (error) {
      console.error('Error applying for hackathon:', error);
      setErrorMessages((prev) => ({
        ...prev,
        [hackathon_id]: 'An unexpected error occurred.'
      }));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}/${day}/${year}`;
  };

  return (
    <div className="bg-white py-3 container mx-auto px-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">Hackathons</h1>
      {hackathons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {hackathons.map((hackathon) => (
            <div key={hackathon.id} className="border border-gray-300 rounded-lg p-4 flex flex-col">

              <div className="block font-semibold text-xl text-left pt-3 pb-5 md:pb-10 flex flex-row">
                {hackathon.sponsors_list.map((sponsor, index) => (
                  <a href={sponsor.link} target="_blank" rel="noopener noreferrer" key={index}>
                    <img src={sponsor.logo} alt={sponsor.name} className="h-10 md:h-16 px-2 md:px-3" />
                  </a>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl text-black">
                    <a href={`https://ethicalspectacle.org/hackathon?id=${hackathon.id}`} className="hover:underline flex items-center">
                      {hackathon.name}
                      <FaArrowRight className="text-base ml-1" />
                    </a>
                  </h2>
                  <h3 className="text-base md:text-xl mt-4">
                    {formatDate(hackathon.start_date_time)} - {formatDate(hackathon.end_date_time)}
                  </h3>
                  <h3 className="text-base md:text-xl py-1">Badge: {hackathon.emoji}</h3>
                  <h3 className="text-base md:text-xl text-gray-500 mb-2">{hackathon.location}</h3>
                </div>
              </div>

              {isLoggedIn ? (
                applications[hackathon.id] ? (
                  <p className="text-green-600 font-semibold mt-2">Status: {applications[hackathon.id]}</p>
                ) : (
                  <>
                    <button 
                      className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600" 
                      onClick={() => applyForHackathon(hackathon.id)}
                    >
                      Apply
                    </button>
                    {errorMessages[hackathon.id] && <p className="text-red-600 mt-2 text-sm">{errorMessages[hackathon.id]}</p>}
                  </>
                )
              ) : (
                <p className="text-red-600 mt-2">Sign in to apply</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500">We'll post some hackathons soon, miss you too😢</div>
      )}
    </div>
  );
};

export default Hackathons;
