import React, { useEffect, useState } from 'react';

const { API_URL_PROD } = require('../../../../config/config');

const Project = ({ hackathonId, userTeamId }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/get_projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ hackathon_id: hackathonId }),
        });
        const data = await response.json();
        setProjects(data.filter(project => project.team_id === userTeamId));
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [hackathonId, userTeamId]);

  const handleUpdateProject = async (projectId, field, value) => {
    const formData = new FormData();
    formData.append('project_id', projectId);
    formData.append('field', field);
    formData.append('value', value);

    console.log("Sending formData: ", formData);

    try {
      const response = await fetch(`${API_URL_PROD}/update_project`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === projectId ? { ...project, [field]: value } : project
          )
        );
      } else {
        const errorText = await response.text();
        console.error('Failed to update project', errorText);
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleInputBlur = (projectId, field, value) => {
    handleUpdateProject(projectId, field, value);
  };

  const handleInputChange = (projectId, field, value) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, [field]: value } : project
      )
    );
  };

  if (!projects.length) {
    return <div>Loading projects...</div>;
  }

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id} className="p-4 py-6 m-4 bg-gray-100 rounded-lg shadow-md">
          <div>
            <label className="block font-semibold capitalize">Project Name</label>
            <input
              type="text"
              value={project.project_name}
              onChange={(e) => handleInputChange(project.id, 'project_name', e.target.value)}
              onBlur={(e) => handleInputBlur(project.id, 'project_name', e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleInputBlur(project.id, 'project_name', e.target.value);
                }
              }}
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <div className="mt-2">
            <label className="block font-semibold capitalize">Project Description</label>
            <textarea
              value={project.project_desc}
              onChange={(e) => handleInputChange(project.id, 'project_desc', e.target.value)}
              onBlur={(e) => handleInputBlur(project.id, 'project_desc', e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleInputBlur(project.id, 'project_desc', e.target.value);
                }
              }}
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <div className="mt-2">
            <label className="block font-semibold capitalize">Project Files Link</label>
            <input
              type="text"
              value={project.project_files_link}
              onChange={(e) => handleInputChange(project.id, 'project_files_link', e.target.value)}
              onBlur={(e) => handleInputBlur(project.id, 'project_files_link', e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleInputBlur(project.id, 'project_files_link', e.target.value);
                }
              }}
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>

          <div className="mt-2">
            <label className="block font-semibold capitalize">Deployment Link</label>
            <input
              type="text"
              value={project.deployment_link}
              onChange={(e) => handleInputChange(project.id, 'deployment_link', e.target.value)}
              onBlur={(e) => handleInputBlur(project.id, 'deployment_link', e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleInputBlur(project.id, 'deployment_link', e.target.value);
                }
              }}
              className="w-full p-2 mt-1 border rounded-md"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Project;
