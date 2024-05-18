import React, { useEffect, useState } from "react";
import Tippy from '@tippyjs/react'; 
import 'tippy.js/dist/tippy.css'; // default tooltip styling
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

const API_URL_PROD =
  "https://api.ethicalspectacle.com/";
  // "http://127.0.0.1:5000";

const levelDetails = {
  Trainee: {
    icon: "🔭",
    range: [0, 3],
    color: "#FFE82D", // Yellow
    perks: ["Invitations to events"]
  },
  "Space Cadet": {
    icon: "🧑‍🚀️",
    range: [4, 6],
    color: "#FFA500", // Orange
    perks: ["Creative collective access", "Join a project"]
  },
  Alien: {
    icon: "🛸",
    range: [7, 10],
    color: "#32CD32", // Green
    perks: ["Post a project", "Priority access to events and research positions"]
  },
  "Star Master": {
    icon: "🧙",
    range: [11, 15],
    color: "#1E90FF", // Blue
    perks: ["Invite-only mixer events", "Leadership roles"]
  },
  "Cosmic Overlord": {
    icon: "👾",
    range: [16, Infinity],
    color: "#8A2BE2", // Purple
    perks: ["All-access pass", "Personalized support", "Hall of fame status in the community"]
  }
};

function Levels({ userEmail }) {
  const [userLevel, setUserLevel] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const [isPerksExpanded, setIsPerksExpanded] = useState(false);

  useEffect(() => {
    fetchUserLevel();
  }, [userEmail]);

  const fetchUserLevel = async () => {
    try {
      const response = await fetch(`${API_URL_PROD}/get_badges`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const badges = await response.json();
      
      const totalPoints = badges.reduce((sum, badge) => sum + badge.points_added, 0);
      setUserPoints(totalPoints);
      
      const level = Object.keys(levelDetails).find(level => {
        const [min, max] = levelDetails[level].range;
        return totalPoints >= min && totalPoints <= max;
      });
      
      setUserLevel(level);
    } catch (error) {
      console.error("Error fetching user level:", error);
    }
  };

  const getProgress = (points, range) => {
    const [min, max] = range;
    const progress = ((points - min) / (max - min)) * 100;
    return Math.max(progress, 5); // Ensure a minimum progress of 5%
  };

  if (!userLevel) return <div>Loading...</div>;

  const currentLevelDetails = levelDetails[userLevel];
  const nextLevel = Object.keys(levelDetails).find(
    level => levelDetails[level].range[0] > currentLevelDetails.range[1]
  );
  const nextLevelDetails = nextLevel ? levelDetails[nextLevel] : null;

  const progress = getProgress(userPoints, currentLevelDetails.range);

  const getAllPerks = (level) => {
    const levels = Object.keys(levelDetails);
    const currentIndex = levels.indexOf(level);
    const perks = [];
    for (let i = 0; i <= currentIndex; i++) {
      perks.push(...levelDetails[levels[i]].perks);
    }
    return perks;
  };

  const allCurrentPerks = getAllPerks(userLevel);

  const handleTogglePerks = () => {
    setIsPerksExpanded(!isPerksExpanded);
  };

  return (
    <div className="bg-white p-5 border border-black border-3 w-full border-b-6">
      {/* Header */}
      <h2 className="text-3xl font-semibold mb-3">Levels</h2>
      
      {/* Level Progress */}
      <div className="mb-4">
        <div className="text-xl mb-2">
          <span>Current Level: </span>
          <span className="font-bold">
            {userLevel.charAt(0).toUpperCase() + userLevel.slice(1)}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center mb-2 relative">
          {/* Current Level Icon */}
          <div className="flex flex-col items-center">
            <span className="text-3xl">{currentLevelDetails.icon}</span>
          </div>
          
          {/* Progress Bar Container */}
          <div className="relative w-full bg-gray-200 h-6 rounded-full overflow-hidden flex-grow mx-2">
            <div
              className="absolute top-0 left-0 h-full"
              style={{
                width: `${progress}%`,
                backgroundColor: currentLevelDetails.color
              }}
            />
            <div
              className="absolute top-0 left-0 h-full flex items-center justify-center"
              style={{
                left: `${progress}%`,
                transform: `translateX(-${progress}%)`,
                width: 'fit-content',
                padding: '0 5px',
              }}
            >
              <span className="text-lg font-semibold">{userPoints}</span>
            </div>
          </div>
          
          {/* Next Level Icon */}
          {nextLevelDetails && (
            <div className="flex flex-col items-center">
              <span className="text-3xl">{nextLevelDetails.icon}</span>
            </div>
          )}
        </div>
        <div className="flex justify-between mb-2">
          {/* Current Level Points */}
          <span className="text-lg">{currentLevelDetails.range[0]}pts</span>
          {/* Next Level Points */}
          {nextLevelDetails && (
            <span className="text-lg">{nextLevelDetails.range[0]}pts</span>
          )}
        </div>
      </div>
      
      {/* Current Level Perks */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold mb-1 flex items-center">
            <span onClick={handleTogglePerks} className="cursor-pointer">
              {isPerksExpanded ? <FaChevronDown className="mr-2" /> : <FaChevronRight className="mr-2" />}
            </span>
            Perks
          </h3>
        </div>
        
        {isPerksExpanded && (
          <ul className="list-disc pl-5">
            {allCurrentPerks.map((perk, index) => (
              <li key={index} className="text-lg">{perk}</li>
            ))}
            {nextLevelDetails && (
              <>
                {nextLevelDetails.perks.map((perk, index) => (
                  <li key={index} className="text-lg text-gray-400">{perk}</li>
                ))}
                <p className="text-sm text-gray-400 mt-1">*upcoming perks*</p>
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Levels;
