'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

const { API_URL_PROD } = require('../config/config');

const Hackathons = () => {
  const { isLoggedIn, userEmail } = useAuth();
  const [hackathons, setHackathons] = useState([]);
  const [applications, setApplications] = useState({});
  const [expanded, setExpanded] = useState({});

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}/${day}/${year}`;
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
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
                  <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
                    <img key={index} src={sponsor.logo} alt={sponsor.name} className="h-10 md:h-16 px-2 md:px-3" />
                  </a>
                ))}
              </div>

              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(hackathon.id)}>
                <div>
                  <div className="flex flex-row">
                    <div className="mt-1">{expanded[hackathon.id] ? <FaChevronDown size={20} /> : <FaChevronRight size={20} />}</div>
                    <h2 className="pl-1">{hackathon.name}</h2>
                  </div>
                  <h3 className="text-base md:text-xl mt-4">
                    {formatDate(hackathon.start_date_time)} - {formatDate(hackathon.end_date_time)}
                  </h3>
                  <h3 className="text-base md:text-xl py-1">Badge: {hackathon.emoji}</h3>
                  <h3 className="text-base md:text-xl text-gray-500 mb-2">{hackathon.location}</h3>
                </div>
              </div>

              {expanded[hackathon.id] && (
                <div className="">
                  <div className="text-gray-600 mt-2">{hackathon.description}</div>

                  {hackathon.url && (
                    <a href={hackathon.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg py-2 px-3 font-semibold mt-1 border border-black border-5">Hackathon Info/Resources</a>
                  )}

                  {hackathon.prizes && hackathon.prizes.length > 0 && (
                    <div className="text-gray-600 mt-4 mb-5">
                      <span className="font-semibold">Prizes:</span>
                      <div className="list-disc ml-5 mt-2">
                        {hackathon.prizes.map((prize, index) => (
                          <div key={index}>
                            <span className="font-semibold">{prize.name}:</span> 
                            {prize.description} (${prize.prize_money})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {hackathon.organizer_emails_list && hackathon.organizer_emails_list.length > 0 && (
                    <div className="text-gray-600 mt-4 mb-2">
                      <span className="font-semibold">Organizers:</span>
                      <div className="ml-5 mt-2">
                        {hackathon.organizer_emails_list.map((email, index) => (
                          <div key={index}>{email}</div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
              {isLoggedIn ? (
                applications[hackathon.id] ? (
                  <p className="text-green-600 font-semibold mt-2">Status: {applications[hackathon.id]}</p>
                ) : (
                  <button 
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600" 
                    onClick={() => applyForHackathon(hackathon.id)}
                  >
                    Apply
                  </button>
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
