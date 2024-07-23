import React from 'react';
import TeamMembers from './TeamMembers';

const ProjectItem = ({ project }) => {
  return (
    <div className="p-4 mb-4 border-2 border-gray-300 rounded-lg">
      <h3 className="text-2xl font-semibold text-black mb-3">{project.project_name}</h3>
      <p className="text-lg text-black">{project.project_desc}</p>
      <TeamMembers teamName={project.team_name} members={project.team_members} />
      <div className="grid grid-cols-2 gap-2 text-center mt-3">
        {project.project_files_link && <a href={project.project_files_link} className="w-full bg-gray-800 text-white py-1 rounded-lg">Project Files</a>}
        {project.deployment_link && <a href={project.deployment_link} className="w-full bg-gray-800 text-white rounded-lg py-1">Live Demo</a>}
      </div>
    </div>
  );
};


const Projects = ({ projects }) => {
  return (
    <div>
      <h2 className="mt-2 mb-4 text-3xl font-semibold text-black">Projects</h2>
      {projects.map((project, index) => (
        <ProjectItem key={index} project={project} />
      ))}
    </div>
  );
};

export default Projects;
