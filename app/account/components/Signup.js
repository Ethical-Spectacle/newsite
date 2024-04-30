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
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div className="input-group">
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
          ></textarea>
        </div>
          <div className="input-group">
            <label>
              <input
                type="checkbox"
                name="entrepreneur"
                checked={formData.entrepreneur}
                onChange={handleCheckboxChange}
              />
              Entrepreneur
            </label>
          </div>
          <div className="input-group">
            <label>
              <input
                type="checkbox"
                name="developer"
                checked={formData.developer}
                onChange={handleCheckboxChange}
              />
              Developer
            </label>
          </div>
        <div className="button-group">
          <button className="sign-up-button" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
