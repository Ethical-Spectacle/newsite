'use client';
import React from 'react'
import { useEffect, useState } from 'react';
import { API_URL_PROD } from '../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link';


function ProfileCard({userEmail}) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const links = [
      { icon: faGlobe, url: profile?.website, label: 'Website' },
      { icon: faGithub, url: profile?.github, label: 'GitHub' },
      { icon: faLinkedin, url: profile?.linkedin, label: 'LinkedIn' }
    ].filter(link => link.url);

    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const response = await fetch(`https://ethical-spectacle-backend-e4d474b5c453.herokuapp.com/get_profile`, {
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

  return (
    <div>
      <h1>Hey {profile?.fname},</h1>
      <p>Member #{profile.id}</p>
      <p><strong>Bio:</strong>{profile.bio ? profile.bio : '...'}</p>
      <div>
      {links.map((link, index) => (
        <Link key={index} href={link.url}> 
          <FontAwesomeIcon icon={link.icon} />
        </Link>
      ))}
      </div>
    </div>
  )
}

export default ProfileCard