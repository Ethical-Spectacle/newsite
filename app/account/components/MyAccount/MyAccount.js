'use client';
import React, { useState, useEffect } from 'react';
import HomeTab from './Home/Tab';
import EventHostTab from './EventHost/Tab';
import LevelsTab from './Levels/Tab';
import GetInvolvedTab from './GetInvolved/Tab';
import HackathonOrganizerTab from './HackathonOrganizer/Tab';
import HackathonParticipantTab from './HackathonParticipant/Tab';
import ResearchTab from './Research/Tab';
import ResearchProjectTab from './ResearchProject/Tab'; // Import the new ResearchProjectTab component

const { API_URL_PROD } = require('../../../config/config');

function MyAccount({ userEmail }) {
  const [badges, setBadges] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [organizingHackathons, setOrganizingHackathons] = useState([]);
  const [participantHackathons, setParticipantHackathons] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/get_badges`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),
        });
        const data = await response.json();
        setBadges(data);

        const totalPoints = data.reduce((sum, badge) => sum + badge.points_added, 0);
        setUserPoints(totalPoints);
      } catch (error) {
        console.error('Error fetching badges:', error);
      }
    };

    const fetchHackathons = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/get_hackathons`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const hackathons = await response.json();
        const userOrganizingHackathons = hackathons.filter(hackathon =>
          hackathon.published && hackathon.organizer_emails_list.includes(userEmail)
        );
        setOrganizingHackathons(userOrganizingHackathons);

        const fetchApplications = async (hackathonId) => {
          try {
            const res = await fetch(`${API_URL_PROD}/get_applications`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ hackathon_id: hackathonId }),
            });
            const applications = await res.json();
            return applications;
          } catch (error) {
            console.error('Error fetching applications:', error);
            return [];
          }
        };

        const currentHackathons = hackathons.filter(hackathon => new Date(hackathon.end_date_time) > new Date());

        const participantPromises = currentHackathons.map(async (hackathon) => {
          const applications = await fetchApplications(hackathon.id);
          const userApplication = applications.find(app => app.email === userEmail && app.status === 'accepted');
          return userApplication ? hackathon : null;
        });

        const userParticipantHackathons = (await Promise.all(participantPromises)).filter(h => h);
        setParticipantHackathons(userParticipantHackathons);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
      }
    };

    const fetchUserProjects = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/get_user_research_applications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),
        });

        if (response.ok) {
          const data = await response.json();
          // Filter projects to only include those with status 'accepted'
          const acceptedProjects = data.filter(project => project.status === 'accepted');
          setUserProjects(acceptedProjects);
        } else {
          console.error('Failed to fetch user projects');
        }
      } catch (error) {
        console.error('Error fetching user projects:', error);
      }
    };

    fetchBadges();
    fetchHackathons();
    fetchUserProjects();
  }, [userEmail]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-wrap justify-center bg-gray-100 p-2">
        <button onClick={() => setActiveTab('home')} className={`px-3 md:px-6 py-2 text-white ${activeTab === 'home' ? 'bg-blue-700' : 'bg-blue-500'} hover:bg-blue-600 m-1 rounded`}>Home</button>
        <button onClick={() => setActiveTab('levels')} className={`px-3 md:px-6 py-2 text-white ${activeTab === 'levels' ? 'bg-green-700' : 'bg-green-500'} hover:bg-green-600 m-1 rounded`}>Levels</button>
        <button onClick={() => setActiveTab('getInvolved')} className={`px-3 md:px-6 py-2 text-white ${activeTab === 'getInvolved' ? 'bg-red-700' : 'bg-red-500'} hover:bg-red-600 m-1 rounded`}>Participate</button>
        {userPoints > 6 && (
          <button onClick={() => setActiveTab('research')} className={`px-3 md:px-6 py-2 text-white ${activeTab === 'research' ? 'bg-teal-700' : 'bg-teal-500'} hover:bg-teal-600 m-1 rounded`}>Research</button>
        )}
        {badges.some(badge => badge.badge_name.toLowerCase() === 'event host') && (
          <button onClick={() => setActiveTab('eventHost')} className={`px-3 md:px-6 py-2 text-white ${activeTab === 'eventHost' ? 'bg-yellow-700' : 'bg-yellow-500'} hover:bg-yellow-600 m-1 rounded`}>Event Host</button>
        )}
        {organizingHackathons.map(hackathon => (
          <button key={hackathon.id} onClick={() => setActiveTab(`hackathonOrganizer_${hackathon.id}`)} className={`px-3 md:px-6 py-2 text-white ${activeTab === `hackathonOrganizer_${hackathon.id}` ? 'bg-yellow-700' : 'bg-yellow-500'} hover:bg-yellow-600 m-1 rounded`}>{hackathon.name}</button>
        ))}
        {participantHackathons.map(hackathon => (
          <button key={hackathon.id} onClick={() => setActiveTab(`hackathonParticipant_${hackathon.id}`)} className={`px-3 md:px-6 py-2 text-white ${activeTab === `hackathonParticipant_${hackathon.id}` ? 'bg-purple-700' : 'bg-purple-500'} hover:bg-purple-600 m-1 rounded`}>{hackathon.name}</button>
        ))}
        {userProjects.map(project => (
          <button key={project.project_id} onClick={() => setActiveTab(`researchProjectDetails_${project.project_id}`)} className={`px-3 md:px-6 py-2 text-white ${activeTab === `researchProjectDetails_${project.project_id}` ? 'bg-teal-700' : 'bg-teal-500'} hover:bg-teal-600 m-1 rounded`}>{project.title}</button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === 'home' && <HomeTab userEmail={userEmail} />}
        {activeTab === 'levels' && <LevelsTab userEmail={userEmail} />}
        {activeTab === 'getInvolved' && <GetInvolvedTab userEmail={userEmail} />}
        {activeTab === 'research' && <ResearchTab userEmail={userEmail} userPoints={userPoints} />}
        {userProjects.map(project => (
          activeTab === `researchProjectDetails_${project.project_id}` && <ResearchProjectTab key={project.project_id} projectId={project.project_id} />
        ))}
        {participantHackathons.map(hackathon => (
          activeTab === `hackathonParticipant_${hackathon.id}` && <HackathonParticipantTab key={hackathon.id} userEmail={userEmail} hackathonId={hackathon.id} />
        ))}
        {activeTab === 'eventHost' && <EventHostTab userEmail={userEmail} />}
        {organizingHackathons.map(hackathon => (
          activeTab === `hackathonOrganizer_${hackathon.id}` && <HackathonOrganizerTab key={hackathon.id} userEmail={userEmail} hackathonId={hackathon.id} />
        ))}
      </div>
    </div>
  );
}

export default MyAccount;
