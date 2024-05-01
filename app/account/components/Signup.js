import React, { useState } from "react";

const API_URL_PROD = "https://api.ethicalspectacle.com/";

const Signup = ({ handleAuthentication }) => {
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
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
      const data = await response.json();
      console.log(data);
      // If account creation is successful, call handleAuthentication to update state
      handleAuthentication(formData.email);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg max-w-sm mx-auto border border-gray-900">
      <h2 className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="First Name"
            className="p-2 w-full border-2 border-gray-900 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Last Name"
            className="p-2 w-full border-2 border-gray-900 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-2 w-full border-2 border-gray-900 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-2 w-full border-2 border-gray-900 rounded"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="p-2 w-full border-2 border-gray-900 rounded h-24"
          ></textarea>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="entrepreneur"
            checked={formData.entrepreneur}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label className="text-gray-900 font-semibold">Entrepreneur</label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="developer"
            checked={formData.developer}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label className="text-gray-900 font-semibold">Developer</label>
        </div>
        <div className="flex justify-center">
          <button className="bg-gray-900 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-200" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
