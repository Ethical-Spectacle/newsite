'use client';
import React, { useState, useEffect } from 'react';
import { FaGlobe, FaGithub, FaLinkedin } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export default function Rankings() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL_PROD = "https://api.ethicalspectacle.com/";
  const badgeDetails = {
    director: { emoji: "💼", description: "Director: One of our core team members!!!" },
    "event host": { emoji: "🎤", description: "Event Host: This member invested in all of you by hosting an event. Want to host? Suggest an event on your profile page." },
    researcher: { emoji: "🔬", description: "Researcher: Joined one of our research projects. Apply on your profile page." },
    developer: { emoji: "💻", description: "Developer" },
    entrepreneur: { emoji: "🚀", description: "Entrepreneur" },
    volunteer: { emoji: "🤝", description: "Volunteer: Badge given for each volunteer opportunity seized." },
    mentor: { emoji: "🧠", description: "Mentor: Guided the next generation of geniuses at our first hackathon" },
    judge: { emoji: "⚖️", description: "Judge: Expert in their field, this leader evaluated the team demos at a hackathon." },
    speaker: { emoji: "🗣️", description: "Speaker: Shared knowledge at one of our events." },
    sponsor: { emoji: "🌟", description: "Sponsor: Helped support our events." },
    attendee: { emoji: "👥", description: "Attendee: Actively participating in our events." },
    winner: { emoji: "🏆", description: "Winner: Won a hackathon!!!" }
  };

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/get_rankings`);
        if (!response.ok) {
          throw new Error('Failed to fetch rankings');
        }
        const data = await response.json();
        const rankingsData = JSON.parse(data);
        setRankings(rankingsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-gray-800 pb-2 mb-4">Leaderboard</h1>
      <div className="w-full">
        <div className="grid grid-cols-12 text-gray-600 font-bold border-b-2 border-gray-500 py-3">
          <span className="hidden sm:block col-span-1">Rank</span>
          <span className="col-span-3">Name</span>
          <span className="hidden sm:block col-span-2">Score</span>
          <span className="col-span-3">Links</span>
          <span className="col-span-3">Badges</span>
        </div>
        {rankings.map((ranking, index) => (
          <div className="border-b border-gray-300 last:border-b-0 py-3" key={index}>
            <div className="grid sm:grid-cols-12 items-center text-left">
              <div className="hidden sm:block col-span-1 text-lg text-gray-800">#{index + 1}</div>
              <div className="col-span-12 sm:col-span-3 text-lg font-semibold text-gray-800">{ranking.name}</div>
              <div className="hidden sm:block col-span-2 text-sm text-gray-600">{ranking.points}</div>
              <div className="col-span-12 sm:col-span-6 mt-2 sm:mt-0 flex justify-start sm:justify-between items-center space-x-2">
                <div className="flex justify-start items-center space-x-2">
                  {ranking.website && <a href={ranking.website} target="_blank" rel="noopener noreferrer"><FaGlobe className="text-gray-500 hover:text-gray-700"/></a>}
                  {ranking.github && <a href={ranking.github} target="_blank" rel="noopener noreferrer"><FaGithub className="text-gray-500 hover:text-gray-700"/></a>}
                  {ranking.linkedin && <a href={ranking.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-gray-500 hover:text-gray-700"/></a>}
                </div>
                <div className="align-right space-x-1 text-lg text-gray-800">
                  {ranking.badges.split(', ').map((badge, badgeIndex) => {
                    const badgeInfo = badgeDetails[badge];
                    return badgeInfo ? (
                      <Tippy key={badgeIndex} content={badgeInfo.description}>
                        <span className="">{badgeInfo.emoji}</span>
                      </Tippy>
                    ) : (
                      <span key={badgeIndex} className="text-xs text-gray-600">{badge}</span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};