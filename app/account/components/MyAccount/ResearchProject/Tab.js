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
  <div>
    <PrivateProjectDetails project={projectDetails} />
    <ProjectTeam projectId={projectId} />
  </div>
  )
};

export default ResearchProjectTab;
