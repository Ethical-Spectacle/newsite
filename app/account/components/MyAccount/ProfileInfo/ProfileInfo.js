import React, { useState, useEffect } from "react";
import { FaGlobe, FaGithub, FaLinkedin } from "react-icons/fa";
const API_URL_PROD =
  "https://api.ethicalspectacle.com/";

const ProfileInfo = ({ userEmail }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/get_profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);
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
      fname: document.getElementById("fname").value,
      lname: document.getElementById("lname").value,
      bio: document.getElementById("bio").value,
      website: document.getElementById("website").value,
      github: document.getElementById("github").value,
      linkedin: document.getElementById("linkedin").value,
    };

    try {
      const response = await fetch(`${API_URL_PROD}/update_profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
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
    <div className="myAccount">
      <h1>Hey {profile?.fname},</h1>
      {profile ? (
        <div>
          {isEditing ? (
            <div>
              <input
                type="text"
                defaultValue={profile.fname}
                id="fname"
                placeholder="First Name"
              />
              <br />
              <input
                type="text"
                defaultValue={profile.lname}
                id="lname"
                placeholder="Last Name"
              />
              <br />
              <input
                type="text"
                defaultValue={profile.bio}
                id="bio"
                placeholder="Bio"
              />
              <br />
              <input
                type="text"
                defaultValue={profile.website}
                id="website"
                placeholder="Personal Website"
              />
              <br />
              <input
                type="text"
                defaultValue={profile.github}
                id="github"
                placeholder="GitHub URL"
              />
              <br />
              <input
                type="text"
                defaultValue={profile.linkedin}
                id="linkedin"
                placeholder="LinkedIn URL"
              />
              <br />

              <button onClick={updateProfile}>Save</button>
            </div>
          ) : (
            <div className="details-container">
              <p>Member #{profile.id}</p>
              <p>
                <strong>Bio:</strong> {profile.bio}
              </p>
              <div className="link-container">
                {profile.website && (
                  <a
                    className="links"
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGlobe />
                  </a>
                )}
                {profile.github && (
                  <a
                    className="links"
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    className="links"
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin />
                  </a>
                )}
              </div>
              <button className="primary-button" onClick={toggleEditMode}>Edit Profile</button>
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
