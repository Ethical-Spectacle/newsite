import React, { useState, useEffect } from 'react';
import { FaGlobe, FaGithub, FaLinkedin } from 'react-icons/fa';
import Toggle from 'react-toggle';
import "react-toggle/style.css";  // import the stylesheet for react-toggle

const API_URL_PROD = 'https://api.ethicalspectacle.com/';
// const API_URL_PROD = 'http://127.0.0.1:5000/';

const ProfileInfo = ({ userEmail }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/get_profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
        setIsLeaderboardVisible(data.leaderboard === 1);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchProfile();
    }
  }, [userEmail]);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const updateProfile = async () => {
    const updatedProfile = {
      email: userEmail,
      fname: document.getElementById('fname').value,
      lname: document.getElementById('lname').value,
      bio: document.getElementById('bio').value,
      website: document.getElementById('website').value,
      github: document.getElementById('github').value,
      linkedin: document.getElementById('linkedin').value,
    };

    try {
      const response = await fetch(`${API_URL_PROD}/update_profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json(); // server returns updated profile
      setProfile(updatedData);
      setIsEditing(false); // exit edit mode
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const toggleLeaderboardVisibility = async () => {
    try {
      const response = await fetch(`${API_URL_PROD}/toggle_leaderboard_visibility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle leaderboard visibility');
      }

      const data = await response.json();
      setIsLeaderboardVisible(data.leaderboard === 1);
    } catch (error) {
      setError(error.message);
    }
  };

  if (!userEmail) {
    return <div>No user email provided</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white p-5 border border-black border-3 w-full">
      <h1 className="text-3xl font-semibold mb-3">Hey {profile?.fname},</h1>
      {profile ? (
        <div>
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                defaultValue={profile.fname}
                id="fname"
                placeholder="First Name"
                className="border border-gray-300 p-2 w-full"
              />
              <input
                type="text"
                defaultValue={profile.lname}
                id="lname"
                placeholder="Last Name"
                className="border border-gray-300 p-2 w-full"
              />
              <input
                type="text"
                defaultValue={profile.bio}
                id="bio"
                placeholder="Bio"
                className="border border-gray-300 p-2 w-full"
              />
              <input
                type="text"
                defaultValue={profile.website}
                id="website"
                placeholder="Personal Website"
                className="border border-gray-300 p-2 w-full"
              />
              <input
                type="text"
                defaultValue={profile.github}
                id="github"
                placeholder="GitHub URL"
                className="border border-gray-300 p-2 w-full"
              />
              <input
                type="text"
                defaultValue={profile.linkedin}
                id="linkedin"
                placeholder="LinkedIn URL"
                className="border border-gray-300 p-2 w-full"
              />
              <button
                onClick={updateProfile}
                className="px-3 py-1 mt-4 rounded bg-black text-white font-semibold"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="details-container">
              <p>Member #{profile.id}</p>
              <p>
                <strong>Bio:</strong> {profile.bio}
              </p>
              <div className="link-container flex space-x-3 items-center mt-3">
                {profile.website && (
                  <a
                    className="links p-2 bg-black text-white rounded-md"
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGlobe />
                  </a>
                )}
                {profile.github && (
                  <a
                    className="links p-2 bg-black text-white rounded-md border border-black border-2"
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    className="links p-2 bg-black text-white rounded-md border border-black border-2"
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin />
                  </a>
                )}
                <button
                  className="primary-button px-3 py-1 bg-white text-black font-semibold rounded-md border border-black border-2"
                  onClick={toggleEditMode}
                >
                  Edit Profile
                </button>
              </div>
              <div className="mt-3">
                <label className="flex items-center space-x-3">
                  <span>Show on Leaderboard:</span>
                  <Toggle
                    defaultChecked={isLeaderboardVisible}
                    icons={true}
                    onChange={toggleLeaderboardVisibility}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>No profile found</div>
      )}
    </div>
  );
};

export default ProfileInfo;
