'use client';

import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignUpForm';
import VerifyEmail from './components/VerifyEmail';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import { checkEmailVerification, authenticateUser, handleLogout, handleAuthentication } from './utils/auth';

const AccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoadingEmailVerification, setIsLoadingEmailVerification] = useState(false);

  useEffect(() => {
    // Read from localStorage when the component mounts
    const storedUserEmail = localStorage.getItem('userEmail');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedIsEmailVerified = localStorage.getItem('isEmailVerified') === 'true';
    const storedIsAdmin = storedUserEmail === 'admin@yourdomain.com'; // Adjust admin check as necessary

    setUserEmail(storedUserEmail);
    setIsLoggedIn(storedIsLoggedIn);
    setIsEmailVerified(storedIsEmailVerified);
    setIsAdmin(storedIsAdmin);

    // If user is logged in and email needs verification, check it
    if (storedUserEmail && storedIsLoggedIn && !storedIsEmailVerified) {
      setIsLoadingEmailVerification(true);
      checkEmailVerification(storedUserEmail).then(isVerified => {
        setIsEmailVerified(isVerified);
        localStorage.setItem('isEmailVerified', isVerified.toString());
        setIsLoadingEmailVerification(false);
      }).catch(error => {
        console.error('Error checking email verification:', error);
        setIsLoadingEmailVerification(false);
      });
    }
  }, []);

  const toggleForm = () => setShowLogin(prev => !prev);

  return (
    <div>
      {isLoggedIn ? (
        isLoadingEmailVerification ? (
          <p>Loading...</p>
        ) : !isEmailVerified ? (
          <VerifyEmail userEmail={userEmail} onLogout={handleLogout} />
        ) : isAdmin ? (
          <AdminDashboard onLogout={handleLogout} />
        ) : (
          <Dashboard userEmail={userEmail} onLogout={handleLogout} />
        )
      ) : (
        showLogin ? <LoginForm onAuth={handleAuthentication} /> : <SignupForm onAuth={handleAuthentication} />
      )}
    </div>
  );
};

export default AccountPage;
