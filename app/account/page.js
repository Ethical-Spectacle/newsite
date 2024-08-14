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
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const badge_id = query.get('badge_id');
    if (badge_id) {
      setBadgeId(badge_id);
    }
  }, []);

  useEffect(() => {
    if (userEmail && isLoggedIn && !isEmailVerified) {
      console.log("Checking email verification for:", userEmail);
      checkEmailVerification(userEmail).finally(() => setLoading(false)); // Set loading to false once the check is done
    } else {
      setLoading(false); // No need to check, so stop loading
    }
  }, [userEmail, isLoggedIn, isEmailVerified]);

  const toggleForm = () => setShowLogin(prev => !prev);

  if (loading) {
    return (
      <div className="loading-screen min-h-screen flex flex-col pt-20">
        <p className="text-center text-xl">Loading...</p>
      </div>
    );
  }

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
