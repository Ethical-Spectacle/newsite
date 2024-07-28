import React, { useState, useEffect } from 'react';
import TeamMembers from './TeamMembers';
import { useAuth } from '../context/AuthContext';

const { API_URL_PROD } = require('../config/config');

const ProjectItem = ({ project, onVote, isVotingOpen, userVotes }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleVoteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmVote = () => {
    onVote(project.id);
    setShowConfirmation(false);
  };

  const hasVoted = userVotes.includes(project.id);

  return (
    <div className={`p-4 mb-4 border-2 border-gray-300 rounded-lg ${hasVoted ? 'bg-gray-200' : ''}`}>
      <h3 className="text-2xl font-semibold text-black mb-3">{project.project_name}</h3>
      <p className="text-lg text-black">{project.project_desc}</p>
      <TeamMembers teamName={project.team_name} members={project.team_members} />
      <div className="grid grid-cols-2 gap-2 text-center mt-3">
        {project.project_files_link && <a href={project.project_files_link} className="w-full bg-black text-white py-1 rounded-lg">Project Files</a>}
        {project.deployment_link && <a href={project.deployment_link} className="w-full bg-black text-white rounded-lg py-1">Live Demo</a>}
      </div>
      {hasVoted && <p className="text-green-600 text-center mt-2">You voted for this project :)</p>}
      {isVotingOpen && !hasVoted && (
        <div className="mt-3">
          {!showConfirmation ? (
            <button onClick={handleVoteClick} className="bg-blue-500 text-white py-1 px-3 rounded-lg w-full">Vote 👍</button>
          ) : (
            <div className="flex flex-row">
              <button onClick={handleConfirmVote} className="bg-green-500 text-white py-1 px-3 rounded-lg flex-grow">Confirm Vote</button>
              <button onClick={() => setShowConfirmation(false)} className="bg-red-500 text-white py-1 px-3 rounded-lg ml-2">Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Projects = ({ projects, hackathon }) => {
  const { isLoggedIn, userEmail } = useAuth();
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [userVotes, setUserVotes] = useState([]);

  const isVotingOpen = () => {
    const now = new Date();
    const votingOpenDate = new Date(hackathon.voting_open_date_time);
    const votingCloseDate = new Date(hackathon.voting_close_date_time);
    return now >= votingOpenDate && now <= votingCloseDate;
  };

  const calculateTimeRemaining = () => {
    const now = new Date();
    const votingCloseDate = new Date(hackathon.voting_close_date_time);
    const difference = votingCloseDate - now;

    if (difference <= 0) {
      setTimeRemaining(null);
      return;
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
  };

  useEffect(() => {
    if (isVotingOpen()) {
      calculateTimeRemaining();
      const timer = setInterval(calculateTimeRemaining, 1000);
      return () => clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    const fetchUserVotes = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/user_votes?hackathon_id=${hackathon.id}&email=${userEmail}`);
        const data = await response.json();
        setUserVotes(data.user_votes || []);
      } catch (error) {
        console.error('Error fetching user votes:', error);
      }
    };

    if (isLoggedIn && hackathon && hackathon.id && userEmail) {
      fetchUserVotes();
    }
  }, [isLoggedIn, hackathon, userEmail]);

  const handleVote = async (projectId) => {
    try {
      const response = await fetch(`${API_URL_PROD}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hackathon_id: hackathon.id, email: userEmail, project_id: projectId })
      });

      if (!response.ok) {
        throw new Error('Failed to cast vote');
      }
      alert('Vote cast successfully');
      setUserVotes((prevVotes) => [...prevVotes, projectId]); // Update user votes locally
    } catch (error) {
      console.error('Error casting vote:', error);
      alert('Failed to cast vote');
    }
  };

  return (
    <div>
      <h2 className="mt-5 mb-4 text-3xl font-semibold text-black">🚀 Projects</h2>
      {hackathon.voting_enabled == 1 && isVotingOpen() && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 mt-3">
          <p className="font-bold">Voting is Open!</p>
          <p>You can vote three times, and voting closes in {timeRemaining}.</p>
          {!isLoggedIn && (
            <p className="text-base text-red-500 mt-3">
              <a href="/account" className="text-black underline">Sign in</a> to vote for projects in this hackathon.
            </p>
          )}
        </div>
      )}
      {projects.map((project, index) => (
        <ProjectItem
          key={index}
          project={project}
          onVote={handleVote}
          isVotingOpen={hackathon.voting_enabled == 1 && isLoggedIn && isVotingOpen()}
          userVotes={userVotes}
        />
      ))}
    </div>
  );
};

export default Projects;
