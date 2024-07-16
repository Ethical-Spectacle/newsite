'use client';
import React, { useState, useEffect } from 'react';
import { FaGlobe, FaGithub, FaLinkedin } from 'react-icons/fa';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const { API_URL_PROD } = require('../config/config');

export default function Rankings() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/get_rankings`);
        if (!response.ok) {
          throw new Error('Failed to fetch rankings');
        }
        const data = await response.json();
        console.log('Fetched Rankings:', data);
        setRankings(data);
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
        <p className="mt-3 text-gray-500 text-md">Our top developers get invites to exclusive events, free swag, and recruited through our network.</p>
      </div>

      <div className="w-full">
        {rankings.map((ranking, index) => (
          <div key={index} className="bg-white py-6 px-8 md:px-48 border border-black border-3 border-b-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-gray-500 text-lg">{`#${index + 1}`}</span>
                <span className="text-xl ml-5">{ranking.name}</span>
              </div>
              <span className="text-sm text-gray-500">{ranking.points}pts</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-2">
                {ranking.profile_pic_low_quality_base64 && (
                  <img
                    src={`data:image/jpeg;base64,${ranking.profile_pic_low_quality_base64}`}
                    alt="Profile"
                    className="w-8 h-8 object-cover"
                  />
                )}
                {ranking.badges.split(', ').map((badge, badgeIndex) => (
                  ranking.emojis.split(', ')[badgeIndex] && ranking.descriptions.split(', ')[badgeIndex] ? (
                    <Tippy
                      key={badgeIndex}
                      content={ranking.descriptions.split(', ')[badgeIndex]}
                    >
                      <span className="text-2xl">{ranking.emojis.split(', ')[badgeIndex]}</span>
                    </Tippy>
                  ) : null
                ))}
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
}
