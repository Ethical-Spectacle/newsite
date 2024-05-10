'use client';
import React, { useState } from "react";
import { useAuth } from '../../context/AuthContext';

const Login = ({ toggleForm }) => {
  const API_URL_PROD = "https://api.ethicalspectacle.com/";
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        login(formData.email, data.email_verified ?? false);
      } else {
        console.error("Authentication failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex m-5 md:m-20 items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white border-4 border-black">
        <h2 className="mb-6 text-4xl font-bold text-black">Login 🥽</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-4 text-xl text-black bg-white border-2 border-black focus:outline-none"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-4 text-xl text-black bg-white border-2 border-black focus:outline-none"
            />
          </div>
          <div className="button-group">
            <button className="w-full p-3 bg-black text-white text-xl font-bold hover:bg-gray-700 rounded" type="submit">Log In</button>
          </div>
        </form>
        <button className="mt-4 text-black bg-transparent hover:bg-gray-100" onClick={toggleForm}>Switch to Signup</button>
      </div>
    </div>
  );
};

export default Login;
