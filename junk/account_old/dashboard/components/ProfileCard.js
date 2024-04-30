'use client';
import React from 'react'
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link';
import Badges from './Badges';
import CertificatesList from './Certificates';


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
          console.log('Loading...', API_BASE_URL);
          try {
            const response = await fetch(`${API_BASE_URL}/get_profile`, {
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
    <div className='border border-slate-800 p-5'>
      <p className='pink-pill mb-4'>Member #{profile.id}</p>
      <h1>Hey {profile?.fname},</h1>

      <section className='w-full flex flex-col md:flex-row'>
        <div className='flex-1 p-2'>
          <p><span className='font-semibold'>Bio:</span>{profile.bio ? profile.bio : ' No bio yet'}</p>
            {links.map((link, index) => (
              <Link key={index} href={link.url}> 
                <FontAwesomeIcon icon={link.icon} />
              </Link>
            ))}
        </div>
        <div className='flex-1 px-2 py-4'>
          <h2 className="text-lg font-semibold">Badges:</h2>
          <Badges userEmail={userEmail} />
        </div>
        <div className='flex-1 px-2 py-4'>
          <h2 className="text-lg font-semibold">Certificates:</h2>
          <CertificatesList userEmail={userEmail} />
        </div>
      </section>

    </div>
  )
}

export default ProfileCard