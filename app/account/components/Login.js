import React, { useState } from "react";

const API_URL_PROD = "https://api.ethicalspectacle.com/";

const Login = ({ handleAuthentication }) => {
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
        handleAuthentication(formData.email, data.email_verified);
      } else {
        console.error("Authentication failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-section min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 text-gray-800 bg-white rounded border border-gray-300 focus:outline-none focus:border-gray-400"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 text-gray-800 bg-white rounded border border-gray-300 focus:outline-none focus:border-gray-400"
            />
          </div>
          <div className="button-group">
            <button className="w-full p-3 bg-gray-800 text-white font-bold rounded hover:bg-gray-900" type="submit">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
