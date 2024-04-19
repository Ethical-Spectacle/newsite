'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../../components/Forms/LoginForm';
import API_URL_PROD from '../../../config/config';
import Image from 'next/image';
import blacklogo from '../../../assets/blacklogo.svg';

const Authentication = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${API_URL_PROD}/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            handleAuthentication(formData.email, data.email_verified);
          } else {
            console.error("Authentication failed:", response.statusText);
          }
        } catch (error) {
          console.error("Error:", error);
        }
    };

  return (
    <div className="w-full md:w-1/2 bg-white rounded-xl p-5 md:p-10 flex flex-col space-y-5 justify-center items-center shadow-md">
        <Image 
          src={blacklogo} 
          alt="Ethical Spectacle Logo"
          width={100} 
        />
        <h2>Login</h2>
        <LoginForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Authentication;