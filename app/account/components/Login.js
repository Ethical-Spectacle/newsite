'use client';
import React, { useState } from "react";
import { useAuth } from '../../context/AuthContext';

const Login = ({ toggleForm, badge_id, setLoading }) => {
  const { API_URL_PROD } = require('../../config/config');
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message before login attempt
    try {
      const requestBody = { ...formData };
      if (badge_id) {
        requestBody.badge_id = badge_id;
      }
      const response = await fetch(`${API_URL_PROD}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        login(formData.email, data.email_verified ?? false);
        setLoading(true); // Set loading to true only if the login is successful
      } else {
        const errorData = await response.json();
        console.error("Authentication failed:", errorData.message || response.statusText);
        setErrorMessage(errorData.message || "Authentication failed. Double check your email and password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex m-5 md:m-20 pt-5 pb-10 items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white border-2 rounded-lg">
        <h2 className="mb-6 text-2xl font-bold text-black text-center">Login 🥽</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-4 text-lg text-black bg-white border-1 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-4 text-lg text-black bg-white border-1 focus:outline-none"
          />
          <button className="bg-blue-500 text-white py-2 w-full rounded hover:bg-blue-600" type="submit">Log In</button>
        </form>
        <button className="mt-3 text-black bg-transparent hover:bg-gray-100 w-full" onClick={toggleForm}>Switch to Signup</button>
      </div>
    </div>
  );
};

export default Login;
