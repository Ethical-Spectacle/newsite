import React, { useEffect, useState } from "react";
import { API_BASE_URL } from '@/config/config';


function Badges({ userEmail }) {
  const [badges, setBadges] = useState([]);

  // badgeDetails object containing the emoji and description for each badge
  const badgeDetails = {
    director: {
      emoji: "💼",
      description: "Director: One of our core team members!!!",
    },
    "event host": {
      emoji: "🎤",
      description:
        "Event Host: This member invested in all of you by hosting an event. Want to host? Suggest an event on your profile page.",
    },
    researcher: {
      emoji: "🔬",
      description:
        "Researcher: Joined one of our research projects. Apply on your profile page.",
    },
    developer: { emoji: "💻", description: "Developer" },
    entrepreneur: { emoji: "🚀", description: "Entrepreneur" },
    volunteer: {
      emoji: "🤝",
      description:
        "Volunteer: Badge given for each volunteer opportunity seized.",
    },
    mentor: {
      emoji: "🧠",
      description:
        "Mentor: Guided the next generation of geniuses at our first hackathon",
    },
    judge: {
      emoji: "⚖️",
      description:
        "Judge: Expert in their field, this leader evaluated the team demos at a hackathon.",
    },
    speaker: {
      emoji: "🗣️",
      description: "Speaker: Shared knowledge at one of our events.",
    },
    sponsor: {
      emoji: "🌟",
      description: "Sponsor: Helped support our events.",
    },
    attendee: {
      emoji: "👥",
      description: "Attendee: Actively participating in our events.",
    },
    winner: { emoji: "🏆", description: "Winner: Won a hackathon!!!" },
  };

  useEffect(() => {
    fetchBadges();
  }, [userEmail]);

  const fetchBadges = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/get_badges`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const badgesJson = await response.json();
      setBadges(badgesJson);
    } catch (error) {
      console.error("Error fetching badges:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      month: "short", 
      day: "2-digit", 
      year: "numeric" 
    };
    return date.toLocaleDateString("en-US", options);
  };
  
  const capitalizeFirstLetters = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      {badges.length > 0 ? (
        badges.map((badge, index) => {
          const details = badgeDetails[badge.badge_name.toLowerCase()];
          return (
            <div key={index} className="flex justify-center items-center border  border-gray-300 bg-white px-3 py-2 rounded-lg space-x-1 w-fit ">
              <span className="badge-emoji">{details?.emoji || "❓"}</span>
              <span className="badge-name">
                {capitalizeFirstLetters(badge.badge_name)}
              </span>
              <span className="badge-date">{formatDate(badge.date)}</span>
            </div>
          );
        })
      ) : (
        <p>⏳ We'll add your badges soon 😎</p>
      )}
    </>
  );
}

export default Badges;
