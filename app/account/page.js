'use client';

import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MyAccount from "./components/MyAccount/MyAccount";
import Admin from "./components/Admin/Admin";
import EmailVerification from "./components/EmailVerification";

const API_URL_PROD = "https://api.ethicalspectacle.com";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoadingEmailVerification, setIsLoadingEmailVerification] =
  useState(false);

  useEffect(() => {
    console.log("Initializing state from localStorage");
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedIsEmailVerified =
      localStorage.getItem("isEmailVerified") === "true";
    const isAdmin = storedUserEmail === "admin@ethicalspectacle.com";

    setUserEmail(storedUserEmail);
    setIsLoggedIn(storedIsLoggedIn);
    setIsAdmin(isAdmin);
    setIsEmailVerified(storedIsEmailVerified);

    if (storedUserEmail && storedIsLoggedIn && !storedIsEmailVerified) {
      setIsLoadingEmailVerification(true);
      checkEmailVerification(storedUserEmail);
    }
  }, []);

  useEffect(() => {
    if (userEmail && isLoggedIn) {
      setIsLoadingEmailVerification(true);
      checkEmailVerification(userEmail);
    }
  }, [userEmail, isLoggedIn]); // This effect reacts to changes in userEmail and isLoggedIn.

  const checkEmailVerification = async (email) => {
    try {
      const response = await fetch(
        `${API_URL_PROD}/check_email_verification?email=${email}`
      );
      const data = await response.json();

      setIsEmailVerified(data.is_verified);
      localStorage.setItem("isEmailVerified", data.is_verified);
    } catch (error) {
      console.error("Error checking email verification:", error);
    } finally {
      setIsLoadingEmailVerification(false);
    }
  };

  const handleAuthentication = (email, emailVerified) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    setIsAdmin(email === "admin@ethicalspectacle.com");
    setIsEmailVerified(emailVerified);

    localStorage.setItem("userEmail", email);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isEmailVerified", emailVerified);
  };

  const handleLogout = () => {
    setUserEmail(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsEmailVerified(false);

    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isEmailVerified");
  };

  const toggleForm = () => setShowLogin((prev) => !prev);

  return (
    <div className="AccountPage">
      {isLoggedIn ? (
        isLoadingEmailVerification ? (
          <p>Loading...</p>
        ) : !isEmailVerified ? (
          <EmailVerification userEmail={userEmail} logout={handleLogout} />
        ) : isAdmin ? (
          <>
            <Admin />
          </>
        ) : (
          <>
            <MyAccount userEmail={userEmail} />
          </>
        )
      ) : (
        <>
          {showLogin ? (
            <>
              <Login handleAuthentication={handleAuthentication} />
              <button className="toggle-button" onClick={toggleForm}>
                Switch to Signup
              </button>
            </>
          ) : (
            <>
              <Signup handleAuthentication={handleAuthentication} />
              <button className="toggle-button" onClick={toggleForm}>
                Switch to Login
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Account;
