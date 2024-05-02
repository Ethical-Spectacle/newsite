import React, { useEffect, useState } from "react";
import "./Badges.css";
const API_URL_PROD =
  "https://api.ethicalspectacle.com/";
  // "http://127.0.0.1:5000";

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
      const response = await fetch(`${API_URL_PROD}/get_badges`, {
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
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const capitalizeFirstLetters = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div>
      <h2 className="text-2xl">Badges:</h2>
      {badges.length > 0 ? (
        badges.map((badge, index) => {
          const details = badgeDetails[badge.badge_name.toLowerCase()];
          return (
            <div key={index} className="bg-gray-200 rounded-lg w-fit px-4 py-2 drop-shadow-sm my-2 text-lg space-x-1">
              <span className="text-2xl">{details?.emoji || "❓"}</span>
              <span className="text-xl" >
                {capitalizeFirstLetters(badge.badge_name)}
              </span>
              <span className="text-xl">{formatDate(badge.date)}</span>
            </div>
          );
        })
      ) : (
        <p>⏳ We'll add your badges soon 😎</p>
      )}
    </div>
  );
}

export default Badges;
