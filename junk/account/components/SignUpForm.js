import React, { useState } from 'react';

const SignupForm = ({ onAuth }) => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    bio: '',
    entrepreneur: false,
    developer: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement API call for signup
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="fname" value={formData.fname} onChange={handleChange} placeholder="First Name" className="input input-bordered w-full" />
        <input type="text" name="lname" value={formData.lname} onChange={handleChange} placeholder="Last Name" className="input input-bordered w-full" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input input-bordered w-full" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="input input-bordered w-full" />
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="textarea textarea-bordered w-full"></textarea>
        <div className="flex justify-between items-center">
          <label className="label cursor-pointer">
            <input type="checkbox" name="entrepreneur" checked={formData.entrepreneur} onChange={handleChange} className="checkbox" />
            Entrepreneur
          </label>
          <label className="label cursor-pointer">
            <input type="checkbox" name="developer" checked={formData.developer} onChange={handleChange} className="checkbox" />
            Developer
          </label>
        </div>
        <button type="submit" className="btn btn-primary w-full">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
