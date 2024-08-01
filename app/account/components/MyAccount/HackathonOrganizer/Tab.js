import React, { useState, useEffect } from 'react';
import Applications from './Applications';
import Teams from './Teams';
import DnDContext from './DnDContext';

const { API_URL_PROD } = require('../../../../config/config');

const HackathonOrganizerTab = ({ userEmail, hackathonId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${API_URL_PROD}/get_applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hackathon_id: hackathonId }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [hackathonId]);

  const handleCreateTeams = async () => {
    try {
      const response = await fetch(`${API_URL_PROD}/create_discord_teams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hackathon_id: hackathonId }),
      });
      if (!response.ok) {
        throw new Error('Failed to create Discord teams');
      }
      alert('Discord teams created successfully');
    } catch (error) {
      alert('Error creating Discord teams: ' + error.message);
    }
  };

  const handleResetTeams = async () => {
    try {
      const response = await fetch(`${API_URL_PROD}/reset_discord_teams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hackathon_id: hackathonId }),
      });
      if (!response.ok) {
        throw new Error('Failed to reset Discord teams');
      }
      alert('Discord teams reset successfully');
    } catch (error) {
      alert('Error resetting Discord teams: ' + error.message);
    }
  };

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <DnDContext>
      <div className="md:my-5 p-5 bg-white shadow-md rounded-lg max-w-4xl mx-auto md:px-10">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleCreateTeams}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Create Teams
          </button>
          <button
            onClick={handleResetTeams}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset Teams
          </button>
        </div>
        <Applications
          userEmail={userEmail}
          hackathonId={hackathonId}
          applications={applications}
          setApplications={setApplications}
        />
        <Teams
          userEmail={userEmail}
          hackathonId={hackathonId}
          applications={applications}
          setApplications={setApplications}
          fetchApplications={fetchApplications}
        />
      </div>
    </DnDContext>
  );
};

export default HackathonOrganizerTab;
