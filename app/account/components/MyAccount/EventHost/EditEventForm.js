import React, { useState, useEffect } from 'react';
import Toggle from 'react-toggle';
import { FaTrashAlt, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import "react-toggle/style.css";

const { API_URL_PROD } = require('../../../../config/config');

const EditEventForm = ({ userEmail }) => {
  const [events, setEvents] = useState([]);
  const [expandedEvents, setExpandedEvents] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    description: '',
    url: '',
    address: '',
    event_organizers_list: [userEmail],
    published: false
  });
  const [newEmail, setNewEmail] = useState('');
  const [pastEventsOpen, setPastEventsOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_URL_PROD}/get_hosted_events?email=${userEmail}`);
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleBlur = async (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
    try {
      const res = await fetch(`${API_URL_PROD}/update_event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event_id: selectedEvent.id, field: name, value: fieldValue }),
      });

      if (!res.ok) {
        alert('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setFormData({
      name: event.name || '',
      date: event.date || '',
      description: event.description || '',
      url: event.url || '',
      address: event.address || '',
      event_organizers_list: event.event_organizers_list ? event.event_organizers_list.split(',') : [userEmail],
      published: event.published || false
    });
  };

  const handleToggleExpand = (eventId) => {
    setExpandedEvents(prevState => ({
      ...prevState,
      [eventId]: !prevState[eventId]
    }));

    if (!expandedEvents[eventId]) {
      const event = events.find(e => e.id === eventId);
      handleEventSelect(event);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleAddEmail = () => {
    if (validateEmail(newEmail)) {
      const updatedEmails = [...formData.event_organizers_list, newEmail];
      setFormData({
        ...formData,
        event_organizers_list: updatedEmails,
      });
      setNewEmail('');
      setEmailError('');
      updateField('event_organizers_list', updatedEmails.join(','));
    } else {
      setEmailError('Please enter a valid email address.');
    }
  };

  const handleRemoveEmail = (index) => {
    const updatedEmails = formData.event_organizers_list.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      event_organizers_list: updatedEmails,
    });
    updateField('event_organizers_list', updatedEmails.join(','));
  };

  const updateField = async (field, value) => {
    try {
      const res = await fetch(`${API_URL_PROD}/update_event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: selectedEvent.id,
          field: field,
          value: value,
        }),
      });

      if (!res.ok) {
        alert('Failed to update field');
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  const handleTogglePublished = async (eventId) => {
    const event = events.find(e => e.id === eventId);
    const updatedPublished = !event.published;
    const updatedEvents = events.map(e => 
      e.id === eventId ? { ...e, published: updatedPublished } : e
    );
    setEvents(updatedEvents);
    try {
      const res = await fetch(`${API_URL_PROD}/update_event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: eventId,
          field: 'published',
          value: updatedPublished ? 1 : 0,
        }),
      });

      if (!res.ok) {
        alert('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const [showQRCode, setShowQRCode] = useState({});

  const handleToggleQRCode = (eventId) => {
    setShowQRCode(prevState => ({
      ...prevState,
      [eventId]: !prevState[eventId]
    }));
  };

  const currentEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());

  return (
    <div className="w-full mb-4 border border-0 border-b-2 border-gray-300">
      <h2 className="text-2xl font-bold my-5">🗓 Your Events</h2>
      <div>
        {currentEvents.map((event) => (
          <div key={event.id} className="p-3 md:p-6 pb-3 bg-white shadow-md rounded-lg">
            <div className="grid grid-cols-3 items-center justify-between mb-4">
              <div className="col-span-3 flex">
                <button
                  className="my-auto items-center mr-2"
                  onClick={() => handleToggleExpand(event.id)}
                >
                  {expandedEvents[event.id] ? <FaChevronDown size={20} /> : <FaChevronRight size={20} />}
                </button>
                <h3 className="text-2xl md:text-xl font-semibold">
                  {event.emoji ? `${event.emoji} ` : ''}{event.name}
                </h3>
              </div>
              <p className="col-span-3 mt-2">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <div className="md:col-span-1 mt-2 items-center flex">
                <Toggle
                  defaultChecked={event.published}
                  icons={false}
                  onChange={() => handleTogglePublished(event.id)}
                />
                <p className="text-sm ml-2">{event.published ? '🎉 Live' : 'Publish'}</p>
              </div>
            </div>
            {expandedEvents[event.id] && (
              <div>
                <form className="">

                  <div className="pb-5 md:pb-8 pt-3 border-b-2 border-t-2 border-grey-500">                
                    <div className="">
                      <label className="block text-gray-700 font-bold mb-1 mt-2">Event Title</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-2">
                        <label className="block text-gray-700 font-bold mb-1 mt-2">Date</label>
                        <input
                          type="datetime-local"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-3 py-2 border rounded"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-gray-700 font-bold mb-1 mt-2">Location</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-3 py-2 border rounded"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-1 mt-2">Signup Link</label>
                      <input
                        type="text"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold mb-1 mt-2">Description</label>
                      <input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>
                  </div>

                  <div className="py-5 md:py-8 border-b-2 border-grey-500">
                    <label className="block text-2xl text-gray-700 font-bold mb-2">Organizer Emails List</label>
                    <div className="flex flex-wrap gap-2">
                      {formData.event_organizers_list.map((email, index) => (
                        <div key={index} className="flex items-center p-2 bg-gray-100 border rounded">
                          <span className="mr-2">{email}</span>
                          <button
                            type="button"
                            className="text-red-500"
                            onClick={() => handleRemoveEmail(index)}
                          >
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 grid grid-cols-8 gap-2 md:gap-4">
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Add Organizer Email"
                        className="col-span-5 md:col-span-6 px-3 my-1 border rounded"
                      />
                      <button
                        type="button"
                        className="col-span-3 md:col-span-2 bg-green-500 my-1 text-white rounded"
                        onClick={handleAddEmail}
                      >
                        Add Email
                      </button>
                    </div>
                    {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
                  </div>
                </form>
                <div className="mt-4">
                  <button
                    onClick={() => handleToggleQRCode(event.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    {showQRCode[event.id] ? 'Hide QR Code' : 'Show QR Code'}
                  </button>
                  {showQRCode[event.id] && (
                    <div className="mt-2">
                      <img src={`data:image/png;base64,${event.qr_code}`} alt="QR Code" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-full md:mb-8">
        <button
          onClick={() => setPastEventsOpen(!pastEventsOpen)}
          className="bg-white text-black px-4 py-2 rounded mb-4 w-full text-left flex items-center"
        >
          {pastEventsOpen ? <FaChevronDown size={20} /> : <FaChevronRight size={20} />}
          <div className="ml-2 text-xl font-semibold">{pastEventsOpen ? 'Close' : 'Past Events'}</div>
        </button>
        {pastEventsOpen && (
          <div className="p-4 pt-0">
            {pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <div key={event.id} className="p-3 md:p-6 mb-4 bg-white shadow-md rounded-lg">
                  <div className="grid grid-cols-3 items-center justify-between mb-4">
                    <div className="col-span-3 flex">
                      <button
                        className="my-auto items-center mr-2"
                        onClick={() => handleToggleExpand(event.id)}
                      >
                        {expandedEvents[event.id] ? <FaChevronDown size={20} /> : <FaChevronRight size={20} />}
                      </button>
                      <h3 className="text-2xl md:text-xl font-semibold">
                        {event.emoji ? `${event.emoji} ` : ''}{event.name}
                      </h3>
                    </div>
                    <p className="col-span-3 mt-2">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  {expandedEvents[event.id] && (
                    <div>
                      <div className="py-5 md:py-8 border-b-2 border-t-2 border-grey-500">
                        <div className="flex flex-row">
                          <p className="w-full px-3 font-semibold flex-1">Date:</p>
                          <p className="w-full px-3 flex justify-end md:justify-start">{new Date(event.date).toLocaleString()}</p>
                        </div>

                        <div className="flex flex-row">
                          <p className="w-full px-3 font-semibold flex-1">Location:</p>
                          <p className="w-full px-3 flex justify-end md:justify-start">{event.address}</p>
                        </div>

                        <div className="mt-3">
                          <p className="w-full px-3 font-semibold">Description:</p>
                          <p className="w-full px-3">{event.description}</p>
                        </div>
                        
                        <div className="mt-3">
                          <p className="w-full px-3 font-semibold">Organizers:</p>
                          <p className="w-full px-3">{event.event_organizers_list}</p>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={() => handleToggleQRCode(event.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            {showQRCode[event.id] ? 'Hide QR Code' : 'Show QR Code'}
                          </button>
                          {showQRCode[event.id] && (
                            <div className="mt-2">
                              <img src={`data:image/png;base64,${event.qr_code}`} alt="QR Code" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-5 text-lg font-semibold">No past events found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditEventForm;
