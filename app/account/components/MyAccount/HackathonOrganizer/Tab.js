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

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <DnDContext>
      <div className="md:my-5 p-5 bg-white shadow-md rounded-lg max-w-4xl mx-auto md:px-10">
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
