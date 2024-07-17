import React, { useState, useEffect } from 'react';
import { FaGlobe, FaGithub, FaLinkedin } from 'react-icons/fa';
import Toggle from 'react-toggle';
import "react-toggle/style.css";  

const { API_URL_PROD } = require('../../../../config/config');


const ProfileInfo = ({ userEmail }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

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

  useEffect(() => {
    if (userEmail) {
      fetchProfile();
    }
  }, [userEmail]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    updateProfile(event.target.files[0]);
  };

  const updateProfile = async (file = null) => {
    const updatedProfile = new FormData();
    updatedProfile.append('email', userEmail);
    updatedProfile.append('fname', document.getElementById('fname').value);
    updatedProfile.append('lname', document.getElementById('lname').value);
    updatedProfile.append('bio', document.getElementById('bio').value);
    updatedProfile.append('website', document.getElementById('website').value);
    updatedProfile.append('github', document.getElementById('github').value);
    updatedProfile.append('linkedin', document.getElementById('linkedin').value);

    if (file) {
      updatedProfile.append('profile_pic', file);
    }

    try {
      const response = await fetch(`${API_URL_PROD}/update_profile`, {
        method: 'POST',
        body: updatedProfile,
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

  const deleteProfilePic = async () => {
    try {
      const response = await fetch(`${API_URL_PROD}/delete_profile_pic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete profile picture');
      }

      fetchProfile();
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
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
    <div className="bg-white px-5 pt-8 md:pt-10 w-full mb-5">
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
              <input
                type="text"
                defaultValue={profile.discord}
                id="discord"
                placeholder="Discord Username"
                className="border border-gray-300 p-2 w-full"
              />
              <div className="flex flex-row space-y-2">

                <label className="px-3 py-2 mt-2 rounded bg-black text-white font-semibold text-center cursor-pointer text-base w-full">
                  <input type="file" onChange={handleFileChange} className="hidden" />
                  Upload Profile Pic
                </label>

                {profile.profile_pic_base64 && (
                  <button
                    onClick={deleteProfilePic}
                    className="px-3 py-2 ml-2 rounded bg-red-500 text-white font-semibold w-full"
                  >
                    Delete Profile Pic
                  </button>
                )}

              </div>
              <button
                onClick={updateProfile}
                className="px-3 py-2 mt-4 rounded bg-black text-white font-semibold text-xl w-full"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="details-container flex flex-col items-start space-y-4">
              <div className="flex items-start">
                <div className="w-32 h-32 overflow-hidden bg-gray-300 flex items-center justify-center">
                  {profile.profile_pic_base64 ? (
                    <img
                      src={`data:image/jpeg;base64,${profile.profile_pic_base64}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-center">No profile picture📸</p>
                  )}
                </div>
                
                <div className="ml-3 w-48">
                  <h1 className="text-2xl md:text-3xl mb-1 flex">👋 {profile?.fname}</h1>
                  <p className="text-base">Member #{profile.id}</p>
                  <div className="flex space-x-3 items-center mb-3">
                    <p className="text-sm">Discord:</p>
                    <p>{profile.discord}</p>
                  </div>

                  <div className="link-container flex space-x-1 mt-3">
                    {profile.website && (
                      <a
                        className="links p-2 bg-black text-white rounded-md border border-black border-2"
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
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3 w-full">
                <div className="flex space-x-3 items-center mb-3">
                  <p className="font-semibold">Bio:</p>
                  <p>{profile.bio}</p>
                </div>

                <label className="flex items-center space-x-3 w-full">
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
