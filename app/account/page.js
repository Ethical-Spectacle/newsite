'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import MyAccount from './components/MyAccount/MyAccount';
import Admin from './components/Admin/Admin';
import EmailVerification from './components/EmailVerification';

const Account = () => {
  const { isLoggedIn, isAdmin, isEmailVerified, login, logout, checkEmailVerification, userEmail } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (userEmail && isLoggedIn && !isEmailVerified) {
      checkEmailVerification(userEmail);
    }
  }, [userEmail, isLoggedIn, isEmailVerified]);

  const toggleForm = () => setShowLogin(prev => !prev);

  return (
    <div className="AccountPage">
      {isLoggedIn ? (
        !isEmailVerified ? (
          <EmailVerification userEmail={userEmail} logout={logout} />
        ) : isAdmin ? (
          <Admin />
        ) : (
          <MyAccount userEmail={userEmail} />
        )
      ) : (
        showLogin ? (
          <Login handleAuthentication={login} toggleForm={toggleForm} />
        ) : (
          <Signup handleAuthentication={login} toggleForm={toggleForm} />
        )
      )}
    </div>
  );
};

export default Account;
