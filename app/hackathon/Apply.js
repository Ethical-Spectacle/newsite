'use client';

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useAuth } from '../context/AuthContext';

const { API_URL_PROD } = require('../config/config');

const Apply = ({ hackathon }) => {
  const { isLoggedIn, userEmail } = useAuth();
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [countdown, setCountdown] = useState('');
  const [applicationsClosed, setApplicationsClosed] = useState(false);
  const [applicationsOpen, setApplicationsOpen] = useState(false);
  const [applicationsClosingCountdown, setApplicationsClosingCountdown] = useState('');

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        const res = await fetch(`${API_URL_PROD}/get_applications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ hackathon_id: hackathon.id })
        });
        const data = await res.json();
        const userApplication = data.find(app => app.email === userEmail);
        if (userApplication) {
          setApplicationStatus(userApplication.status);
        }
      } catch (error) {
        console.error('Error fetching application status:', error);
      }
    };

    if (isLoggedIn) {
      fetchApplicationStatus();
    }

    const calculateCountdown = () => {
      const now = moment();
      const openDateTime = hackathon.application_open_date_time ? moment(hackathon.application_open_date_time) : null;
      const closeDateTime = hackathon.application_close_date_time ? moment(hackathon.application_close_date_time) : null;

      if (closeDateTime && now.isAfter(closeDateTime)) {
        setApplicationsClosed(true);
        setCountdown('');
        return;
      }

      if (openDateTime && now.isBefore(openDateTime)) {
        const intervalId = setInterval(() => {
          const now = moment();
          const duration = moment.duration(openDateTime.diff(now));

          if (duration.asSeconds() <= 0) {
            clearInterval(intervalId);
            setCountdown('');
            setApplicationsOpen(true); // Applications are now open
          } else {
            setCountdown(`${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`);
          }
        }, 1000);

        return () => clearInterval(intervalId);
      } else if (closeDateTime && now.isBefore(closeDateTime)) {
        setApplicationsOpen(true);
        const intervalId = setInterval(() => {
          const now = moment();
          const duration = moment.duration(closeDateTime.diff(now));

          if (duration.asSeconds() <= 0) {
            clearInterval(intervalId);
            setApplicationsClosingCountdown('');
            setApplicationsClosed(true); // Applications are now closed
          } else {
            setApplicationsClosingCountdown(`${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`);
          }
        }, 1000);

        return () => clearInterval(intervalId);
      }
    };

    calculateCountdown();
  }, [isLoggedIn, hackathon.id, userEmail, hackathon.application_open_date_time, hackathon.application_close_date_time]);

  const applyForHackathon = async () => {
    try {
      const response = await fetch(`${API_URL_PROD}/add_application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          hackathon_id: hackathon.id,
          email: userEmail
        })
      });
      if (response.ok) {
        setApplicationStatus('pending');
        setErrorMessage('');
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText);
      }
    } catch (error) {
      console.error('Error applying for hackathon:', error);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  if (!hackathon) {
    return <div>Loading...</div>;
  }

  const renderStatusMessage = () => {
    switch (applicationStatus) {
      case 'accepted':
        return (
        <div>
            <p className="text-green-500 font-semibold mt-2">Application Status: Accepted, let's gooooo</p> 
            <p className="text-base text-gray-600">Visit your dashboard, you'll have access to a new tab for all your hackathon updates ;)</p>
            {hackathon.acceptance_link && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold">RSVP:</h2>
                <a href={hackathon.acceptance_link} target="_blank" rel="noopener noreferrer">
                  {hackathon.acceptance_link}
                </a>
              </div>
            )}
        </div>
        );
      case 'pending':
        return <div><p className="text-green-600 font-semibold mt-2">Application Status: Pending...</p> <p className="text-base text-gray-600">Check back here to see your application status.</p></div>;
      case 'declined':
        return <p className="text-red-600 font-semibold mt-2">Application Status: Declined, we're sorry :(</p>;
      default:
        if (applicationsClosed) {
          return <p className="text-red-600 font-semibold mt-2">Applications have closed :(</p>;
        } else if (applicationsOpen) {
          return (
            <>
              <button
                className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={applyForHackathon}
              >
                Apply Now
              </button>
              {errorMessage && <p className="text-red-600 mt-2 text-sm">{errorMessage}</p>}
            </>
          );
        } else {
          return (
            <>
              <div>
                <h2 className="text-xl font-semibold">Applications open in...</h2>
                <p className="text-2xl font-bold">{countdown}</p>
              </div>
            </>
          );
        }
    }
  };

  return (
    <div className="border border-gray-300 p-4 mt-4 rounded-lg">
      {countdown ? (
        <div>
          <h2 className="text-xl font-semibold">Applications open in...</h2>
          <p className="text-2xl font-bold">{countdown}</p>
        </div>
      ) : (
        !applicationStatus && !applicationsClosed && applicationsOpen && (
          <div>
            <h2 className="text-xl font-bold">How to Apply:</h2>
            <div className="list-disc ml-5 space-y-2 mt-5">
              <p>1. Add a Github, LinkedIn, or personal website link to your profile.</p>
              <p>2. Tell us your skills by joining creative groups (Dashboard/Participate/Creative Collective)</p>
              {hackathon.use_discord && (
                <p>3. This hackathon will use Discord, make sure you have a username in your profile.</p>
              )}
              {applicationsClosingCountdown && (<p className="text-red-400 text-base">Applications close in: {applicationsClosingCountdown}</p>)} 
            </div>
          </div>
        )
      )}
      {!isLoggedIn ? (
        !countdown && (
        <button
            className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => window.location.href = '/account'}
            >
            Log In to Apply
        </button>
        )
      ) : (
        renderStatusMessage()
      )}
    </div>
  );
};

export default Apply;
