import React, { useEffect, useState } from "react";
import Tippy from '@tippyjs/react'; 
import 'tippy.js/dist/tippy.css'; // default tooltip styling

const { API_URL_PROD } = require('../../../config/config');

function Badges({ userEmail }) {
  const [badges, setBadges] = useState([]);

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
            {badges.map((badge, index) => (
              badge.emoji && badge.description ? (
                <Tippy content={badge.description} trigger="click" key={index}>
                  <div className="badge-card px-3 p-2 border border-gray-300 shadow-sm rounded-lg flex items-center ">
                    <span className="text-3xl">{badge.emoji || "❓"}</span>
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
              ) : null
            ))}
          </div>
        ) : (
          <div className="text-center py-5 text-lg font-semibold">⏳ We'll add your badges soon 😎</div>
        )}
      </div>
    </div>
  );
}

export default Badges;
