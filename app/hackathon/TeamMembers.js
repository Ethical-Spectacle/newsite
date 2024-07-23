import React, { useState } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const skillIcons = {
  graphic_design: '🎨',
  frontend: '📱',
  backend: '🖥️',
  ai_ml_engineer: '🤖',
  management: '🕶',
};

const renderSkills = (member) => (
  <div className="flex space-x-2 bg-gray-300 px-2 py-1 mt-1 rounded-lg">
    {Object.keys(skillIcons).map(skill => (
      member[skill] ? (
        <Tippy key={skill} content={skill.replace('_', ' ')}>
          <span className="text-2xl justify-end">{skillIcons[skill]}</span>
        </Tippy>
      ) : null
    ))}
  </div>
);

const TeamMemberCard = ({ member }) => {
  return (
    <div key={member.user_id} className="flex items-center mb-2 md:mb-4">
      <img
        src={`data:image/jpeg;base64,${member.profile_pic_low_quality_base64}`}
        alt={`${member.fname} ${member.lname}`}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <div className="font-semibold">{member.fname} {member.lname}</div>
        <div className="flex space-x-2 ml-auto">
          {renderSkills(member)}
          <div className="text-xl flex space-x-2 my-auto">
            {member.website && <a href={member.website} target="_blank" rel="noopener noreferrer"><FaGlobe /></a>}
            {member.github && <a href={member.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>}
            {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>}
          </div>
        </div>
      </div>
    </div>
  );
};



const TeamMembers = ({ teamName, members }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-2 mb-6">
      <div
        className="text-xl flex items-center cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="text-xl mr-2">
          {isOpen ? <FaChevronDown /> : <FaChevronRight />}
        </div>
        <h3 className=" font-semibold text-black">Team: {teamName}</h3>

      </div>
      {isOpen && (
        <div className="mt-2">
          {members.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
