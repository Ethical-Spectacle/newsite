'use client';

import React, { useEffect, useState } from 'react';
import ProjectTeam from './ProjectTeam';
import ProjectTimeline from './ProjectTimeline';
import ProjectPapers from './ProjectPapers';


const ResearchProjectPublicPage = () => {
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');
  const { API_URL_PROD } = require('../config/config');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const projectId = query.get('id');

    if (projectId) {
      fetchProjectDetails(projectId);
    }
  }, []);

  const fetchProjectDetails = async (projectId) => {
    try {
      const response = await fetch(`${API_URL_PROD}/get_public_project_by_id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_id: projectId }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProject(data);
    } catch (error) {
      setError(`Failed to fetch project details: ${error.message}`);
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center m-5 md:m-20">
        <div className="p-8 border-4 border-black bg-white">
          <p className="text-xl text-black">{error}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center m-5 md:m-20">
        <div className="p-8 border-4 border-black bg-white">
          <p className="text-xl text-black">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col m-5 my-10 md:m-20 max-w-3xl">
        <div className="w-full max-w-3xl p-8 bg-gray-20 shadow-lg rounded-lg mb-3 ">
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-4xl font-bold mb-1">{project.title}</h1>
            <p className="text-lg mb-6">{project.description}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {project.project_repo_link && (
              <a href={project.project_repo_link} className="bg-blue-500 px-6 py-2 rounded-md text-white flex-grow">
                Project Repo
              </a>
            )}
            {project.latest_blog_link && (
              <a href={project.latest_blog_link} className="bg-blue-500 px-6 py-2 rounded-md text-white flex-grow">
                Latest Blog Post
              </a>
            )}
            {project.extra_project_link && (
              <a href={project.extra_project_link} className="bg-blue-500 px-6 py-2 rounded-md text-white flex-grow">
                Project Deployment
              </a>
            )}
          </div>
        </div>

        <ProjectTimeline timelineList={project.timeline_list} />

        <ProjectPapers papersList={project.papers_list} />

        <div className="w-full mb-4 border border-gray-300 rounded-lg p-4">
          <ProjectTeam projectId={project.id} />
        </div>

      </div>
    </div>
  );
};

export default ResearchProjectPublicPage;
