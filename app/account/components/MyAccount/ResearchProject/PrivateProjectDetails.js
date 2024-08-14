import React from 'react';

const PrivateProjectDetails = ({ project }) => {
  return (
    <div className="p-5 md:my-5 bg-white shadow-md rounded-lg max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold text-gray-800 mb-3">{project.title}</h1>
      <p>{project.description}</p>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Intro</h3>
        <p>{project.rtab_intro}</p>
      </div>

      <div className="mt-4">

        <h3 className="text-xl font-semibold">Bookmarks</h3>
        <ul>
          {project.rtab_bookmarks_list.map((bookmark, index) => (
            <li key={index}><a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.title}</a></li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default PrivateProjectDetails;
