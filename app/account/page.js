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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Define isLoggedIn state
  const [isAdmin, setIsAdmin] = useState(false); // Define isAdmin state
  const [isEmailVerified, setIsEmailVerified] = useState(false); // Define isEmailVerified state

  useEffect(() => {
    if (logged) {
      setUserEmail(localStorage.getItem("userEmail"));
      setIsLoggedIn(true); // Set isLoggedIn state to true if the user is logged in
      setIsEmailVerified(localStorage.getItem("isEmailVerified"));
      setIsAdmin(localStorage.getItem("isAdmin"));
    } else {
      redirect('/join/login');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-start bg-slate-100 py-20">
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
