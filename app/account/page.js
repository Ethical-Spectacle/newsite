'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import MyAccount from './components/MyAccount/MyAccount';
import Admin from './components/Admin/Admin';

const Account = () => {
  const { isLoggedIn, isAdmin, login, logout, userEmail } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const [badgeId, setBadgeId] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const badge_id = query.get('badge_id');
    if (badge_id) {
      setBadgeId(badge_id);
    }
  }, []);

  // Commented out the email verification check
  // useEffect(() => {
  //   if (userEmail && isLoggedIn && !isEmailVerified) {
  //     checkEmailVerification(userEmail);
  //   }
  // }, [userEmail, isLoggedIn, isEmailVerified]);

  const toggleForm = () => setShowLogin(prev => !prev);

  return (
    <div className="AccountPage">
      {isLoggedIn ? (
        isAdmin ? (
          <Admin />
        ) : (
          <MyAccount userEmail={userEmail} />
        )
      ) : (
        showLogin ? (
          <Login handleAuthentication={login} toggleForm={toggleForm} badge_id={badgeId} />
        ) : (
          <Signup handleAuthentication={login} toggleForm={toggleForm} badge_id={badgeId} />
        )
      )}
    </div>
  );
};

export default Account;
