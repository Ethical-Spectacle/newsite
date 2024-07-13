'use client';
import React, { useState } from "react";
import { useAuth } from '../../context/AuthContext';  // Import useAuth

const Signup = ({ toggleForm }) => {
  const { API_URL_PROD } = require('../../config/config');
  const { login } = useAuth();  // Destructure login function from useAuth
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    bio: "",
    entrepreneur: false,
    developer: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL_PROD}/create_account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Log in the user after account creation
        login(formData.email, data.email_verified ?? false);
      } else {
        console.error("Account creation failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex m-5 md:m-20 items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white border-4 border-black">
        <h2 className="mb-6 text-4xl font-bold text-black">Sign Up❤️</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="First Name" className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none" />
          <input type="text" name="lname" value={formData.lname} onChange={handleChange} placeholder="Last Name" className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none" />
          <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio (optional)" className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none h-24 rounded"></textarea>
          <div className="flex flex-row">
            <input type="checkbox" name="developer" checked={formData.developer} onChange={handleChange} className="size-7" />
            <label className="text-black font-semibold ml-3 mt-1">Developer 💻</label>
          </div>
          <div className="flex flex-row">
            <input type="checkbox" name="entrepreneur" checked={formData.entrepreneur} onChange={handleChange} className="size-7" />
            <label className="text-black font-semibold ml-3 mt-1">Entrepreneur 🚀</label>
          </div>
          <button className="w-full p-3 bg-black text-white text-xl font-bold hover:bg-gray-700 rounded" type="submit">Sign Up</button>
        </form>
        <button className="mt-4 text-black bg-transparent hover:bg-gray-100" onClick={toggleForm}>Switch to Login</button>
      </div>
    </div>
  );
};

export default Signup;
