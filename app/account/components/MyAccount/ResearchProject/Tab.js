import React, { useState, useEffect } from 'react';
import PrivateProjectDetails from './PrivateProjectDetails';
import ProjectTeam from './ProjectTeam';

const { API_URL_PROD } = require('../../../../config/config');

const ResearchProjectTab = ({ projectId }) => {
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/get_research_project_by_id`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ project_id: projectId }),
        });

        if (response.ok) {
          const data = await response.json();
          setProjectDetails(data);
        } else {
          console.error('Failed to fetch project details');
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (!projectDetails) {
    return <div>Loading...</div>;
  }

  return (
  <div className="flex flex-col items-center justify-center">
    <div className="max-w-3xl">
      <PrivateProjectDetails project={projectDetails} />

      {projectDetails.discord_link && (
          <div className="text-center mt-7">
            <a href={projectDetails.discord_link} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" target="_blank" rel="noopener noreferrer">
              Discord Channel
            </a>
          </div>
        )}

      <ProjectTeam projectId={projectId} />
    </div>
  </div>
  )
};

export default ResearchProjectTab;
