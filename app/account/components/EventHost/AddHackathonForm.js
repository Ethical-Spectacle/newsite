import React, { useState } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

const { API_URL_PROD } = require('../../../config/config');

const AddHackathonForm = ({ userEmail, onHackathonAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    location: '',
    description: '',
    emoji: ''
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL_PROD}/add_hackathon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, kickoff_date: formData.start_date, email: userEmail }),
      });

      if (res.ok) {
        alert('Hackathon draft added successfully');
        setFormData({
          name: '',
          start_date: '',
          end_date: '',
          location: '',
          description: '',
          emoji: '',
        });
        setIsOpen(false);
        onHackathonAdded(); // Notify the parent component
      } else {
        alert('Failed to add hackathon');
      }
    } catch (error) {
      console.error('Error adding hackathon:', error);
    }
  };

  return (
    <div className="w-full px-2 py-1 my-5 md:mb-8 shadow-md rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white text-black px-4 py-2 rounded mb-4 w-full text-left flex items-center"
      >
        {isOpen ? <FaChevronDown size={20} /> : <FaChevronRight size={20} />}
        
        <div className="ml-2 text-3xl font-semibold">{isOpen ? 'Close' : '🛠️ Start a hackathon'}</div>
      </button>
      {isOpen && (
        <div className="p-4">

          <h2 className="text-2xl font-bold mb-4">Create a new draft of a hackathon post:</h2>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-6 gap-4 md:mb-3">
                <div className="col-span-4 md:col-span-5">
                    <label className="block text-gray-700 font-bold">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-gray-700 font-bold">Emoji</label>
                    <input
                    type="text"
                    name="emoji"
                    value={formData.emoji}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                    />
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 md:mb-5">
              <div className="col-span-2">
                <label className="block text-gray-700 font-bold mb-1 mt-2">Start Date</label>
                <input
                  type="datetime-local"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 font-bold mb-1 mt-2">End Date</label>
                <input
                  type="datetime-local"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="md:mb-5">
              <label className="block text-gray-700 font-bold mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Address of the hackathon venue"
                className="w-full px-3 py-2 border rounded text-base"
                required
              />
            </div>

            <div className="md:mb-5">
              <label className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                placeholder="Write a description of the hackathon, this can be up to a few paragraphs long."
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded h-48"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Hackathon
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddHackathonForm;
