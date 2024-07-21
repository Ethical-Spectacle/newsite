import React, { useState, useEffect } from 'react';
import InfoCard from './InfoCard'; // Import InfoCard component

const { API_URL_PROD } = require('../../../../config/config');

const HackathonParticipantTab = ({ userEmail, hackathonId }) => {
  const [hackathon, setHackathon] = useState(null);

  useEffect(() => {
    const fetchHackathonDetails = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/get_hackathons`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const hackathons = await response.json();
        const currentHackathon = hackathons.find(h => h.id === hackathonId);
        setHackathon(currentHackathon);
      } catch (error) {
        console.error('Error fetching hackathon details:', error);
      }
    };

    fetchHackathonDetails();
  }, [hackathonId]);

  if (!hackathon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:mt-5 md:p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <InfoCard hackathon={hackathon} />
      {/* Add other participant details and features as needed */}
    </div>
  );
};

export default HackathonParticipantTab;
