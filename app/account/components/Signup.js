'use client';
import React, { useState } from "react";
import { useAuth } from '../../context/AuthContext'; 

const Signup = ({ toggleForm, badge_id }) => {
  const { API_URL_PROD } = require('../../config/config');
  const { login } = useAuth();
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
      const requestBody = { ...formData };
      if (badge_id) {
        requestBody.badge_id = badge_id;
      }
      const response = await fetch(`${API_URL_PROD}/create_account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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
    <div className="flex m-5 md:m-20 pt-5 pb-10 items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white border-2 rounded-lg md:my-10">
        <h2 className="mb-6 text-2xl font-bold text-black text-center">Sign Up❤️</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="First Name" className="w-full p-4 text-lg text-black bg-white border-1 focus:outline-none" />
          <input type="text" name="lname" value={formData.lname} onChange={handleChange} placeholder="Last Name" className="w-full p-4 text-lg text-black bg-white border-1 focus:outline-none" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-4 text-lg text-black bg-white border-1 focus:outline-none" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full p-4 text-lg text-black bg-white border-1 focus:outline-none" />
          <div className="flex flex-row justify-around">
            <div className="flex flex-row">
              <input type="checkbox" name="developer" checked={formData.developer} onChange={handleChange} className="size-5 mt-2" />
              <label className="text-black ml-2 mt-1">Developer 💻</label>
            </div>
            <div className="flex flex-row">
              <input type="checkbox" name="entrepreneur" checked={formData.entrepreneur} onChange={handleChange} className="size-5 mt-2" />
              <label className="text-black ml-2 mt-1 mb-2">Entrepreneur 🚀</label>
            </div>
          </div>
          <button className="bg-blue-500 text-white py-2 w-full rounded hover:bg-blue-600" type="submit">Sign Up</button>
        </form>
        <button className="mt-3 text-black bg-transparent hover:bg-gray-100 w-full" onClick={toggleForm}>Switch to Login</button>
      </div>
    </div>
  );
};

export default Signup;
