import React, { useState, useEffect } from 'react';
import ResearchProjects from '../../../../research/ResearchProjects';
import EditResearchProjectForm from './EditResearchProjectForm';
import AddResearchProjectForm from './AddResearchProjectForm';

const { API_URL_PROD } = require('../../../../config/config');

const ResearchTab = ({ userEmail, userPoints }) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL_PROD}/get_user_research_projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        console.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectAdded = () => {
    fetchProjects();
  };

  return (
    <div className="py-5 md:my-5 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <ResearchProjects projects={projects} userEmail={userEmail} />
      <div className="m-5">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Your Research Projects</h1>
        {projects.length > 0 ? (
          projects.map((project) => (
              <EditResearchProjectForm 
                key={project.id} 
                project={project} 
                userEmail={userEmail} 
                fetchProjects={fetchProjects} 
              />
          ))
        ) : (
          <div className="text-gray-500">Members with over 10pts can start research projects here 🚀</div>
        )}
        {userPoints >= 10 && (<AddResearchProjectForm userEmail={userEmail} onProjectAdded={handleProjectAdded} />)}
      </div>
    </div>
  );
};

export default ResearchTab;
