'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import MyAccount from './components/MyAccount/MyAccount';
import Admin from './components/Admin/Admin';
import EmailVerification from './components/EmailVerification';

const Account = () => {
  const { isLoggedIn, isAdmin, login, logout, userEmail, checkEmailVerification, isEmailVerified } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const [badgeId, setBadgeId] = useState(null);
  const [emailChecked, setEmailChecked] = useState(false);  // State to track if verification was checked

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const badge_id = query.get('badge_id');
    if (badge_id) {
      setBadgeId(badge_id);
    }
  }, []);

  // Invoke email verification check
  if (userEmail && isLoggedIn && !emailChecked) {
    console.log("Checking email verification for:", userEmail);
    checkEmailVerification(userEmail);
    setEmailChecked(true);  // Ensure this only runs once per render cycle
  }

  const toggleForm = () => setShowLogin(prev => !prev);

  return (
    <div className="AccountPage">
      {isLoggedIn ? (
        isEmailVerified ? (
          isAdmin ? (
            <Admin />
          ) : (
            <MyAccount userEmail={userEmail} />
          )
        ) : (
          <EmailVerification userEmail={userEmail} logout={logout} />
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
