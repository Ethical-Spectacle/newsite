import React, { useState, useEffect } from 'react';
import { FaGlobe, FaGithub, FaLinkedin, FaUsers } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const { API_URL_PROD } = require('../../../../config/config');

const ProjectTeam = ({ projectId }) => {
  const [acceptedApplicants, setAcceptedApplicants] = useState([]);
  const [discordLink, setDiscordLink] = useState('');

  const fetchAcceptedApplicants = async () => {
    try {
      const response = await fetch(`${API_URL_PROD}/get_research_project_members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_id: projectId }),
      });

      if (response.ok) {
        const data = await response.json();
        setAcceptedApplicants(data.applicants || []);
        setDiscordLink(data.discord_link || '');
      } else {
        console.error('Failed to fetch accepted applicants');
      }
    } catch (error) {
      console.error('Error fetching accepted applicants:', error);
    }
  };

  useEffect(() => {
    fetchAcceptedApplicants();
  }, [projectId]);

  const skillIcons = {
    graphic_design: '🎨',
    frontend: '📱',
    backend: '🖥️',
    ai_ml_engineer: '🤖',
    management: '🕶',
  };

  const renderSkills = (applicant) => (
    <div className="bg-gray-300 flex space-x-2 px-2 py-1 rounded-lg">
      {Object.keys(skillIcons).map(skill => (
        applicant[skill] ? (
          <Tippy key={skill} content={skill.replace('_', ' ')}>
            <span className="text-2xl">{skillIcons[skill]}</span>
          </Tippy>
        ) : null
      ))}
    </div>
  );

  return (
    <div className="min-h-36 pb-2 md:pb-5 border-b-2 border-gray-300">
      <div className="py-5">
        <h1 className="hidden md:block text-3xl text-black">Team Members</h1>
        <h1 className="block md:hidden text-3xl text-black">Team</h1>
      </div>

      <div className="w-full">
        {acceptedApplicants.map((applicant) => (
          <div key={applicant.application_id} className="bg-white py-3 px-4 border border-gray-400 border-1 mb-4 rounded-lg">
            <div className="flex justify-between">
              <div className="flex justify-start space-x-4">
                <span className="text-xl my-auto">{`${applicant.fname} ${applicant.lname}`}</span>
                {applicant.preferred_teammates_emails_list && applicant.preferred_teammates_emails_list !== '[]' && (
                  <Tippy content={JSON.parse(applicant.preferred_teammates_emails_list).join(', ')}>
                    <span className="text-xl mt-1"><FaUsers /></span>
                  </Tippy>
                )}
              </div>
              <div className="flex space-x-2 justify-end my-auto">
                {applicant.website && <a href={applicant.website} className="text-xl text-gray-500 hover:text-pink-400"><FaGlobe /></a>}
                {applicant.github && <a href={applicant.github} className="text-xl text-gray-500 hover:text-gray-700"><FaGithub /></a>}
                {applicant.linkedin && <a href={applicant.linkedin} className="text-xl text-gray-500 hover:text-gray-700"><FaLinkedin /></a>}
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 mb-2 md:mb-0">
              <div className="flex flex-wrap space-x-2">
                <div className="py-1 mr-2 md:mr-3">
                  {applicant.profile_pic_lq_base_64 && (
                    <img
                      src={`data:image/jpeg;base64,${applicant.profile_pic_lq_base_64}`}
                      alt="Profile"
                      className="w-8 h-8 object-cover"
                    />
                  )}
                </div>
                {renderSkills(applicant)}
                <div className="py-1 flex space-x-2">
                  {applicant.badges.map((badge, index) => (
                    <Tippy key={index} content={applicant.badge_descriptions[index]}>
                      <span className="text-2xl">{applicant.badge_emojis[index]}</span>
                    </Tippy>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {discordLink && (
          <div className="text-center mt-4">
            <a href={discordLink} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" target="_blank" rel="noopener noreferrer">
              Join Discord Channel
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTeam;
