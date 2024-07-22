'use client';
import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const { API_URL_PROD } = require('../../../../config/config');

const skillIcons = {
  graphic_design: '🎨',
  frontend: '📱',
  backend: '🖥️',
  ai_ml_engineer: '🤖',
  management: '🕶',
};

const renderSkills = (member) => (
  <div className="flex space-x-2 bg-gray-300 px-2 py-1 mt-1 rounded-lg">
    {Object.keys(skillIcons).map(skill => (
      member[skill] ? (
        <Tippy key={skill} content={skill.replace('_', ' ')}>
          <span className="text-2xl justify-end">{skillIcons[skill]}</span>
        </Tippy>
      ) : null
    ))}
  </div>
);

const TeamDetails = ({ hackathonId, userEmail }) => {
  const [userTeam, setUserTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/get_teams`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ hackathon_id: hackathonId }),
        });
        const data = await response.json();

        // Find the team that includes the user
        const team = data.find(team =>
          team.members.some(member => member.email === userEmail)
        );

        setUserTeam(team || null);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError('Failed to fetch team details');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [hackathonId, userEmail]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!userTeam) return <div>You'll be assigned to a team soon :)</div>;

  return (
    <div className="border border-gray-300 rounded-lg p-4 m-4">
      <h2 className="text-xl font-bold">Team: {userTeam.team_name}</h2>
      <div className="mt-2">
        {userTeam.members.length === 0 ? (
          <div>No members in this team</div>
        ) : (
          userTeam.members.map((member) => (
            <div key={member.user_id} className="flex items-center mb-2 md:mb-4">
              <img
                src={`data:image/jpeg;base64,${member.profile_pic_low_quality_base64}`}
                alt={`${member.fname} ${member.lname}`}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="font-semibold">{member.fname} {member.lname}</div>
                <div className="flex space-x-2 ml-auto">
                  {renderSkills(member)}
                  <div className="text-xl flex space-x-2 my-auto">
                  {member.website && <a href={member.website} target="_blank" rel="noopener noreferrer"><FaGlobe /></a>}
                  {member.github && <a href={member.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>}
                  {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <button
        className="bg-blue-500 text-white w-full py-2 mt-2 rounded hover:bg-blue-700"
      >
        Discord #team_channel (not setup)
      </button>
    </div>
  );
};

export default TeamDetails;
