import React, { useState } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
const { API_URL_PROD } = require('../../../config/config');

const AddEventForm = ({ userEmail, onEventAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    description: '',
    url: '',
    address: '',
    event_organizers_list: [userEmail],
    emoji: '',
    published: false,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL_PROD}/add_event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onEventAdded();
        setFormData({
          name: '',
          date: '',
          description: '',
          url: '',
          address: '',
          event_organizers_list: [userEmail],
          emoji: '',
          published: false,
        });
        setIsOpen(false);
      } else {
        alert('Failed to add event');
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold mb-2">Add New Event</h3>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaChevronDown size={20} /> : <FaChevronRight size={20} />}
        </button>
      </div>
      {isOpen && (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-3">
              <label className="block text-gray-700">Event Title</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700">Emoji</label>
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

          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="col-span-4 md:col-span-2">
              <label className="block text-gray-700">Date</label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="col-span-4 md:col-span-2">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Signup Link</label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
  
          <div className="grid grid-cols-9 gap-4 mb-4">
            <div className="col-span-9 md:col-span-7">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full h-24 px-3 py-2 border rounded"
                required
              />
            </div>
            <button type="submit" className="col-span-9 md:col-span-2 bg-blue-500 text-white px-4 py-2 rounded mt-auto">
              Add Event
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddEventForm;
