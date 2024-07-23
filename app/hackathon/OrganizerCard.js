import React from 'react';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

const OrganizerCard = ({ organizer }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 m-2 w-full md:w-1/2 lg:w-1/3">
      <div className="flex items-center mb-2">
        <img
          src={`data:image/jpeg;base64,${organizer.profile_pic_base64}`}
          alt={`${organizer.fname} ${organizer.lname}`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <div className="font-semibold">{organizer.fname} {organizer.lname}</div>
          <div className="text-sm text-gray-600">{organizer.email}</div>
        </div>
      </div>
      <div className="flex space-x-2 mt-2">
        {organizer.website && <a href={organizer.website} target="_blank" rel="noopener noreferrer"><FaGlobe /></a>}
        {organizer.github && <a href={organizer.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>}
        {organizer.linkedin && <a href={organizer.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
      </div>
      <div className="mt-2">
        <p className="text-gray-700 text-sm">{organizer.bio}</p>
      </div>
    </div>
  );
};

export default OrganizerCard;
