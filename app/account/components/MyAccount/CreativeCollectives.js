import React, { useState, useEffect } from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css"; 

const API_URL_PROD = 'https://api.ethicalspectacle.com/';

const CreativeCollectives = ({ userEmail }) => {
  const [membership, setMembership] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/get_membership`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch membership');
        }

        const data = await response.json();
        setMembership(data || {});
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchMembership();
    }
  }, [userEmail]);

  const handleToggle = async (field) => {
    const updatedMembership = {
      ...membership,
      [field]: membership[field] ? 0 : 1,
    };
    setMembership(updatedMembership);

    try {
      const response = await fetch(`${API_URL_PROD}/update_membership`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, ...updatedMembership }),
      });

      if (!response.ok) {
        throw new Error('Failed to update membership');
      }

      const data = await response.json();
      setMembership(data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const collectives = [
    { name: "Graphic Designers", field: "graphic_design", emoji: "🎨", description: "Graphic designers who designing graphically." },
    { name: "Frontend Devs", field: "frontend", emoji: "📱", description: "Our aesthetically gifted bunch." },
    { name: "Backend Devs", field: "backend", emoji: "🖥️", description: "We specialize in messy code." },
    { name: "AI/ML Engineers", field: "ai_ml_engineer", emoji: "🤖", description: "Rockstars. That abt sums it up." },
    { name: "Project Management", field: "management", emoji: "🕶", description: "Professionals who can turn a project into a business." },
  ];

  const CustomCheckedIcon = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
      <span className="text-xs">Join</span>
    </div>
  );

  const CustomUncheckedIcon = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
      <span>Join</span>
    </div>
  );

  return (
    <div className="bg-white p-5 border border-black border-3 w-full">
      <h1 className="text-3xl font-semibold mb-3">Creative Collectives</h1>
      <div className="space-y-3">
        {collectives.map((collective) => (
          <div key={collective.field} className={`p-3 border ${membership[collective.field] === 1 ? 'bg-black text-white' : 'border-gray-300 shadow-sm'} rounded-lg`}>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl mr-2">{collective.emoji}</span>
                <span className="text-xl font-semibold">{collective.name}</span>
              </div>
              <div className="flex items-center">
                <p className={`text-sm ${membership[collective.field] === 1 ? 'hidden text-white' : ''} mr-1`}>Join</p>
                <Toggle
                    defaultChecked={membership[collective.field] === 1}
                    icons={false}
                    onChange={() => handleToggle(collective.field)}
                />
              </div>
            </div>
            <p className={`text-sm mt-2 ${membership[collective.field] === 1 ? 'hidden' : ''}`}>{collective.description}</p>
            {membership[collective.field] === 1 && (
              <div className="mt-2 text-right underline">
                <a
                  href={collective.discord_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-white"
                >
                    Our Discord Channel
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreativeCollectives;
