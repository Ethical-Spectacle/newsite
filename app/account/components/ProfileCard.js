'use client';
import React from 'react'
import { useEffect, useState } from 'react';
import { API_URL_PROD } from '../../config/config';

function ProfileCard({userEmail}) {
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

  return (
    <div>
        <h1>Hey {profile?.fname},</h1>
    </div>
  )
}

export default ProfileCard