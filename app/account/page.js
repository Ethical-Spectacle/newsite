'use client';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import ProfileCard from './components/ProfileCard';

const AccountPage = () => {
  const [ userEmail, setUserEmail ] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setUserEmail(localStorage.getItem("userEmail"));
    } else {
      // User is not logged in, redirect to login page
      redirect('/join/login');
    }
  }, []);

  return (
    <div className="h-screen flex justify-center bg-slate-100">
      <div className="boxed-container flex justify-center items-center">
        <p>Account page</p>
        <ProfileCard userEmail={userEmail} />
      </div>

    </div>
  );
};

export default AccountPage;
