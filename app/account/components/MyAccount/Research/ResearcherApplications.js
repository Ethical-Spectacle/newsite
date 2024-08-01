import React, { useState, useEffect } from 'react';
import { FaGlobe, FaGithub, FaLinkedin, FaUsers } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const { API_URL_PROD } = require('../../../../config/config');

const ResearcherApplications = ({ projectId, userEmail }) => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${API_URL_PROD}/get_pending_researcher_applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_id: projectId }),
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      } else {
        console.error('Failed to fetch applications');
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [projectId]);

  const updateStatus = async (applicationId, status) => {
    try {
      const response = await fetch(`${API_URL_PROD}/update_researcher_application_status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project_id: projectId, email: userEmail, status }),
      });

      if (response.ok) {
        setApplications(applications.map(app =>
          app.application_id === applicationId ? { ...app, status } : app
        ));
      } else {
        throw new Error('Failed to update application status');
      }
    } catch (error) {
      alert(error.message);
    }
  };

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

  const pendingApplications = applications.filter(app => app.status === 'pending');

  return (
    <div className="min-h-36 pb-2 md:pb-5 border-b-2 border-gray-300">
      <div className="py-5">
        <h1 className="hidden md:block text-3xl text-black">Pending Applications: {pendingApplications.length}</h1>
        <h1 className="block md:hidden text-3xl text-black">Applications: {pendingApplications.length}</h1>
      </div>

      <div className="w-full">
        {pendingApplications.map((applicant) => (
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
              <div className="hidden md:block md:grid md:grid-cols-2 md:gap-2">
                <button
                  className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-700"
                  onClick={() => updateStatus(applicant.application_id, 'accepted')}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-700"
                  onClick={() => updateStatus(applicant.application_id, 'declined')}
                >
                  Decline
                </button>
              </div>
              <div className="flex md:hidden flex space-x-2 justify-end my-auto">
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
              <div className="hidden md:flex space-x-2 w-auto justify-end">
                {applicant.website && <a href={applicant.website} className="text-2xl text-gray-500 hover:text-pink-400"><FaGlobe /></a>}
                {applicant.github && <a href={applicant.github} className="text-2xl text-gray-500 hover:text-gray-700"><FaGithub /></a>}
                {applicant.linkedin && <a href={applicant.linkedin} className="text-2xl text-gray-500 hover:text-gray-700"><FaLinkedin /></a>}
              </div>
            </div>
            <div className="block md:hidden grid grid-cols-2 gap-2 mt-2">
              <button
                className="bg-green-500 text-white py-1 rounded hover:bg-green-700 col-span-1"
                onClick={() => updateStatus(applicant.application_id, 'accepted')}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white py-1 rounded hover:bg-red-700 col-span-1"
                onClick={() => updateStatus(applicant.application_id, 'declined')}
              >
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearcherApplications;
