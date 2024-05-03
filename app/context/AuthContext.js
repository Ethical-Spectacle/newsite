'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    // This useEffect will run only in the client-side environment
    const userEmailFromStorage = localStorage.getItem('userEmail');
    const isLoggedInFromStorage = localStorage.getItem('isLoggedIn') === 'true';
    const isEmailVerifiedFromStorage = localStorage.getItem('isEmailVerified') === 'true';

    setUserEmail(userEmailFromStorage);
    setIsLoggedIn(isLoggedInFromStorage);
    setIsEmailVerified(isEmailVerifiedFromStorage);
    setIsAdmin(userEmailFromStorage === "admin@ethicalspectacle.com");
  }, []);

    const login = (email, emailVerified) => {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isLoggedIn', 'true');

        const verifiedString = emailVerified ? "true" : "false";
        localStorage.setItem('isEmailVerified', verifiedString);

        setUserEmail(email);
        setIsLoggedIn(true);
        setIsEmailVerified(emailVerified);
        setIsAdmin(email === "admin@ethicalspectacle.com");
    };


  const logout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isEmailVerified');
    setUserEmail(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsEmailVerified(false);
  };

  const checkEmailVerification = async (email) => {
    const API_URL_PROD = "https://api.ethicalspectacle.com/"
    try {
      const response = await fetch(`${API_URL_PROD}/check_email_verification?email=${email}`);
      const data = await response.json();
      setIsEmailVerified(data.is_verified);
      localStorage.setItem('isEmailVerified', data.is_verified.toString());
    } catch (error) {
      console.error("Error checking email verification:", error);
    }
  };

  return (
    <AuthContext.Provider value={{
      userEmail,
      isLoggedIn,
      isAdmin,
      isEmailVerified,
      login,
      logout,
      checkEmailVerification
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
