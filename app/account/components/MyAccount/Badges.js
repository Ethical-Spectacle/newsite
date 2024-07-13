import React, { useEffect, useState } from "react";
import Tippy from '@tippyjs/react'; 
import 'tippy.js/dist/tippy.css'; // default tooltip styling

const { API_URL_PROD } = require('../../../config/config');

function Badges({ userEmail }) {
  const [badges, setBadges] = useState([]);

  // badgeDetails object containing the emoji and description for each badge
  const badgeDetails = {
    director: {
      emoji: "🤖",
      description: "Director: One of our core team members!!!",
    },
    event_host: {
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
    "event attendee": {
      emoji: "👥",
      description: "Attendee: Actively participating in our events.",
    },
    winner: { emoji: "🏆", description: "Winner: Won a hackathon!!!" },
    ecohacker: { emoji: "🌱", description: "Ecohacker: Participated in our inaugural hackathon!! It's the sustainability for me. April 5-7, 2024." },
    eco_first_place: { emoji: "🥇", description: "FIRST PLACE!! Won 1st place at our sustainability hackathon." },
    eco_second_place: { emoji: "🥈", description: "Second Place!! Won 2nd place at our sustainability hackathon." },
    eco_third_place: { emoji: "🥉", description: "Third Place! Won 3rd place at our sustainability hackathon." },
    eco_creative: { emoji: "🎨", description: "Most Creative: Won the most-creative award at our sustainability hackathon." },
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
      if (!response.ok) throw new Error("Network response was not ok");
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

  return (
    <div className="bg-white p-5 border border-black border-3 w-full border-b-6">
      <h2 className="text-3xl font-semibold mb-3">Badges</h2>
      <div className="badges-list space-y-4">
        {badges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {badges.map((badge, index) => {
              const details = badgeDetails[badge.badge_name.toLowerCase()];
              if (details === undefined) {
                return null;
              }
              return (
                <Tippy content={details.description} trigger="click" key={index}>
                  <div className="badge-card px-3 p-2 border border-gray-300 shadow-sm rounded-lg flex items-center ">
                    <span className="text-3xl">{details?.emoji || "❓"}</span>
                    <div className="ml-4">
                      <span className="block capitalize font-semibold text-lg">
                        {badge.badge_name}
                      </span>
                      <span className="text-sm text-gray-600">
                        {formatDate(badge.date)}
                      </span>
                    </div>
                  </div>
                </Tippy>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-5 text-lg font-semibold">⏳ We'll add your badges soon 😎</div>
        )}
      </div>
    </div>
  );
}

export default Badges;
