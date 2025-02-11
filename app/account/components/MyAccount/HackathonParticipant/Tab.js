import React, { useState, useEffect } from 'react';
import InfoCard from './InfoCard'; // Import InfoCard component
import TeamDetails from './TeamDetails'; // Import TeamDetails component
import HackathonTimeline from './Timeline'; // Import Timeline component
import Project from './Project'; // Import Project component

const { API_URL_PROD } = require('../../../../config/config');

const HackathonParticipantTab = ({ userEmail, hackathonId }) => {
  const [hackathon, setHackathon] = useState(null);
  const [userTeamId, setUserTeamId] = useState(null);

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

  useEffect(() => {
    const fetchUserTeamId = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/get_teams`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ hackathon_id: hackathonId }),
        });
        const teams = await response.json();
        const userTeam = teams.find(team => team.members.some(member => member.email === userEmail));
        setUserTeamId(userTeam ? userTeam.team_id : null);
      } catch (error) {
        console.error('Error fetching user team details:', error);
      }
    };

    if (hackathonId && userEmail) {
      fetchUserTeamId();
    }
  }, [hackathonId, userEmail]);

  if (!hackathon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:mt-5 md:p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <InfoCard hackathon={hackathon} />
      <TeamDetails hackathonId={hackathonId} userEmail={userEmail} />
      <HackathonTimeline hackathonId={hackathonId} />
      {userTeamId && <Project hackathonId={hackathonId} userTeamId={userTeamId} />}
    </div>
  );
};

export default HackathonParticipantTab;
