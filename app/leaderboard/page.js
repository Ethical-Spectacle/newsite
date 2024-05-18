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
    // basic 
    developer: { emoji: "💻", description: "Developer" },
    entrepreneur: { emoji: "🚀", description: "Entrepreneur" },

    // internal team
    director: { emoji: "🤖", description: "Director: One of our core team members!!!" },
    "event host": { emoji: "🎤", description: "Event Host: This member invested in all of you by hosting an event. Want to host? Suggest an event on your profile page." },
    researcher: { emoji: "🔬", description: "Researcher: Joined one of our research projects. Apply on your profile page." },

    // community team
    volunteer: { emoji: "🤝", description: "Volunteer: Badge given for each volunteer opportunity seized." },
    mentor: { emoji: "🧠", description: "Mentor: Guided the next generation of geniuses at our first hackathon" },
    speaker: { emoji: "🗣️", description: "Speaker: Shared knowledge at one of our events." },
    judge: { emoji: "⚖️", description: "Judge: Expert in their field, this leader evaluated the team demos at a hackathon." },
    sponsor: { emoji: "🌟", description: "Sponsor: Helped support our events." },

    // sustainability hackathon ones
    ecohacker: { emoji: "🌱", description: "Ecohacker: Participated in our inaugural hackathon!! It's the sustainability for me. April 5-7, 2024." },
    eco_first_place: { emoji: "🥇", description: "FIRST PLACE!! Won 1st place at our sustainability hackathon." },
    eco_second_place: { emoji: "🥈", description: "Second Place!! Won 2nd place at our sustainability hackathon." },
    eco_third_place: { emoji: "🥉", description: "Third Place! Won 3rd place at our sustainability hackathon." },
    eco_creative: { emoji: "🎨", description: "Most Creative: Won the most-creative award at our sustainability hackathon." },

    // random event ones
    attendee: { emoji: "👥", description: "Attendee: Attended one of our events." },
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
    <div className="min-h-screen">
      <div className="px-5 py-10 md:px-48">
        <h1 className="text-4xl font-bold text-black">Leaderboard 🧠</h1>
        <p className="mt-3 text-gray-500 text-md">Our top developers get invites to exclusive events, free shwag, and recruited through our network.</p>
      </div>
      
      <div className="w-full">
        {rankings.map((ranking, index) => (
          <div key={index} className="bg-white py-6 px-8 md:px-48 border border-black border-3 border-b-0">
            <div className="flex justify-between items-center">
              <span>
                <span className="text-gray-500 text-lg">{`#${index + 1}`}</span>
                <span className="text-xl ml-5">{ranking.name}</span>
              </span>
              <span className="text-sm text-gray-500">{ranking.points}pts</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-2">
                {ranking.badges.split(', ').map((badge, badgeIndex) => {
                  const badgeInfo = badgeDetails[badge];
                  return badgeInfo ? (
                    <Tippy key={badgeIndex} content={badgeInfo.description}>
                      <span className="text-2xl">{badgeInfo.emoji}</span>
                    </Tippy>
                  ) : (
                    <span key={badgeIndex} className="text-xs text-gray-600"></span> // if it's not in the badgeDetails object, just don't show it
                  );
                })}
              </div>
              <div className="flex space-x-2">
                {ranking.website && <a href={ranking.website} className="text-xl text-gray-500 hover:text-pink-400"><FaGlobe /></a>}
                {ranking.github && <a href={ranking.github} className="text-xl text-gray-500 hover:text-gray-700"><FaGithub /></a>}
                {ranking.linkedin && <a href={ranking.linkedin} className="text-xl text-gray-500 hover:text-gray-700"><FaLinkedin /></a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};