'use client';
import { useEffect, useState } from 'react';
import { useLogged } from '@/context/store';
import ProfileCard from './components/ProfileCard';
import Events from './components/Events';
import Button from '../components/Button';
import Divider from './components/Divider';
import Opportunities from './components/Opportunities';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const AccountPage = () => {
  const { logged, setLogged } = useLogged();
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Define isAdmin state
  const [isEmailVerified, setIsEmailVerified] = useState(false); // Define isEmailVerified state

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setUserEmail(localStorage.getItem("userEmail"));
      setIsLoggedIn(true);
      setIsEmailVerified(localStorage.getItem("isEmailVerified"));
      setIsAdmin(localStorage.getItem("isAdmin"));
    } else {
      console.log("Not logged in");
      setLogged(false);
      redirect('/join/login');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-start py-20">
          <div className="boxed-container flex flex-col justify-center">
          <ProfileCard userEmail={userEmail} />
          <Events />
          <Divider />
          <Opportunities />
        </div>
    </div>
  );
};

export default AccountPage;
