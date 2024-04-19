'use client';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import ProfileCard from './components/ProfileCard';
import Events from './components/Events';
import Button from '../components/Button';
import Link from 'next/link';

const AccountPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Define isLoggedIn state
  const [isAdmin, setIsAdmin] = useState(false); // Define isAdmin state
  const [isEmailVerified, setIsEmailVerified] = useState(false); // Define isEmailVerified state

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setUserEmail(localStorage.getItem("userEmail"));
    } else {
      // User is not logged in, redirect to login page
      redirect('/join/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isEmailVerified");
    setUserEmail(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsEmailVerified(false);
    console.log('Logged out');
    redirect('/join/login');
  };

  if (isLoggedIn === false) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex justify-center bg-slate-100">
      <div className="boxed-container flex flex-col justify-center">
        <Link href='/join/login' onClick={handleLogout} >Log Out</Link>
        <ProfileCard userEmail={userEmail} />
        <Events />
      </div>

    </div>
  );
};

export default AccountPage;
