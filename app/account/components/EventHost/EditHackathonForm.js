import React, { useState, useEffect } from 'react';
import Toggle from 'react-toggle';
import { FaTrashAlt } from 'react-icons/fa';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import "react-toggle/style.css";

const { API_URL_PROD } = require('../../../config/config');

const EditHackathonForm = ({ userEmail }) => {
  const [hackathons, setHackathons] = useState([]);
  const [expandedHackathons, setExpandedHackathons] = useState({});
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    start_date_time: '',
    end_date_time: '',
    location: '',
    description: '',
    sponsors_list: [],
    organizer_emails_list: [],
    timeline_events_list: [],
    prizes: [],
    use_discord: false,
    public_files_link: '',
    acceptance_link: '',
    kickoff_link: '',
    published: false,
    application_open_date_time: '',
    application_close_date_time: '',
    max_applicants: '',
    max_participants: '',
    kickoff_date_time: '',
    emoji: '',
  });
  const [newSponsor, setNewSponsor] = useState({ name: '', logo: '', link: '' });
  const [newEmail, setNewEmail] = useState('');
  const [newEvent, setNewEvent] = useState({ start_date_time: '', event: '', location: '', instructions: '' });
  const [newPrize, setNewPrize] = useState({ name: '', description: '', prize_money: '' });

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const res = await fetch(`${API_URL_PROD}/get_hackathons`);
        const data = await res.json();
        const filteredHackathons = data.filter(hackathon => {
          return hackathon.organizer_emails_list.includes(userEmail);
        });
        console.log('Filtered Hackathons:', filteredHackathons);
        setHackathons(filteredHackathons);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
      }
    };

    fetchHackathons();
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleBlur = async (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? (checked ? 1 : 0) : value;
    try {
      const res = await fetch(`${API_URL_PROD}/update_hackathon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hackathon_id: selectedHackathon.id, field: name, value: fieldValue }),
      });

      if (!res.ok) {
        alert('Failed to update hackathon');
      }
    } catch (error) {
      console.error('Error updating hackathon:', error);
    }
  };

  const handleHackathonSelect = (hackathon) => {
    setSelectedHackathon(hackathon);
    setFormData({
      name: hackathon.name || '',
      start_date_time: hackathon.start_date_time || '',
      end_date_time: hackathon.end_date_time || '',
      location: hackathon.location || '',
      description: hackathon.description || '',
      sponsors_list: hackathon.sponsors_list || [],
      organizer_emails_list: hackathon.organizer_emails_list || [],
      timeline_events_list: hackathon.timeline_events_list || [],
      prizes: hackathon.prizes || [],
      use_discord: hackathon.use_discord || false,
      public_files_link: hackathon.public_files_link || '',
      acceptance_link: hackathon.acceptance_link || '',
      kickoff_link: hackathon.kickoff_link || '',
      published: hackathon.published || false,
      application_open_date_time: hackathon.application_open_date_time || '',
      application_close_date_time: hackathon.application_close_date_time || '',
      max_applicants: hackathon.max_applicants || '',
      max_participants: hackathon.max_participants || '',
      kickoff_date_time: hackathon.kickoff_date_time || '',
      emoji: hackathon.emoji || '',
    });
  };

  const handleToggleExpand = (hackathonId) => {
    setExpandedHackathons(prevState => ({
      ...prevState,
      [hackathonId]: !prevState[hackathonId]
    }));

    if (!expandedHackathons[hackathonId]) {
      const hackathon = hackathons.find(h => h.id === hackathonId);
      handleHackathonSelect(hackathon);
    }
  };

  const handleAddSponsor = () => {
    const updatedSponsors = [...formData.sponsors_list, newSponsor];
    setFormData({
      ...formData,
      sponsors_list: updatedSponsors,
    });
    setNewSponsor({ name: '', logo: '', link: '' });
    updateField('sponsors_list', updatedSponsors);
  };

  const handleRemoveSponsor = (index) => {
    const updatedSponsors = formData.sponsors_list.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      sponsors_list: updatedSponsors,
    });
    updateField('sponsors_list', updatedSponsors);
  };

  const handleAddEmail = () => {
    const updatedEmails = [...formData.organizer_emails_list, newEmail];
    setFormData({
      ...formData,
      organizer_emails_list: updatedEmails,
    });
    setNewEmail('');
    updateField('organizer_emails_list', updatedEmails);
  };

  const handleRemoveEmail = (index) => {
    const updatedEmails = formData.organizer_emails_list.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      organizer_emails_list: updatedEmails,
    });
    updateField('organizer_emails_list', updatedEmails);
  };

  const handleAddEvent = () => {
    const updatedEvents = [...formData.timeline_events_list, newEvent];
    setFormData({
      ...formData,
      timeline_events_list: updatedEvents,
    });
    setNewEvent({ start_date_time: '', event: '', location: '', instructions: '' });
    updateField('timeline_events_list', updatedEvents);
  };

  const handleRemoveEvent = (index) => {
    const updatedEvents = formData.timeline_events_list.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      timeline_events_list: updatedEvents,
    });
    updateField('timeline_events_list', updatedEvents);
  };

  const handleAddPrize = () => {
    const updatedPrizes = [...formData.prizes, newPrize];
    setFormData({
      ...formData,
      prizes: updatedPrizes,
    });
    setNewPrize({ name: '', description: '', prize_money: '' });
    updateField('prizes', updatedPrizes);
  };

  const handleRemovePrize = (index) => {
    const updatedPrizes = formData.prizes.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      prizes: updatedPrizes,
    });
    updateField('prizes', updatedPrizes);
  };

  const updateField = async (field, value) => {
    try {
      const res = await fetch(`${API_URL_PROD}/update_hackathon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hackathon_id: selectedHackathon.id,
          field: field,
          value: JSON.stringify(value),
        }),
      });

      if (!res.ok) {
        alert('Failed to update field');
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  const handleTogglePublished = async (hackathonId) => {
    const hackathon = hackathons.find(h => h.id === hackathonId);
    const updatedPublished = !hackathon.published;
    const updatedHackathons = hackathons.map(h => 
      h.id === hackathonId ? { ...h, published: updatedPublished } : h
    );
    setHackathons(updatedHackathons);
    try {
      const res = await fetch(`${API_URL_PROD}/update_hackathon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hackathon_id: hackathonId,
          field: 'published',
          value: updatedPublished,
        }),
      });

      if (!res.ok) {
        alert('Failed to update hackathon');
      }
    } catch (error) {
      console.error('Error updating hackathon:', error);
    }
  };

  const handleToggleDiscord = async (hackathonId) => {
    const hackathon = hackathons.find(h => h.id === hackathonId);
    const updatedDiscord = !hackathon.use_discord;
    const updatedHackathons = hackathons.map(h => 
      h.id === hackathonId ? { ...h, use_discord: updatedDiscord } : h
    );
    setHackathons(updatedHackathons);
    try {
      const res = await fetch(`${API_URL_PROD}/update_hackathon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hackathon_id: hackathonId,
          field: 'use_discord',
          value: updatedDiscord ? 1 : 0,
        }),
      });

      if (!res.ok) {
        alert('Failed to update hackathon');
      }
    } catch (error) {
      console.error('Error updating hackathon:', error);
    }
  };

  return (
    <div className="w-full mb-4">
      <h2 className="text-3xl font-bold my-5">Your Hackathons</h2>
      <div>
        {hackathons.map((hackathon) => (
          <div key={hackathon.id} className="p-3 md:p-6 mb-4 bg-white shadow-md rounded-lg">
            <div className="grid grid-cols-3 items-center justify-between mb-4">
              <div className="col-span-3 flex">
                <button
                  className="my-auto items-center mr-2"
                  onClick={() => handleToggleExpand(hackathon.id)}
                >
                  {expandedHackathons[hackathon.id] ? <FaChevronDown size={20} /> : <FaChevronRight size={20} />}
                </button>
                <h3 className="text-3xl font-semibold">{hackathon.name}</h3>
              </div>
              <p className="col-span-3 mt-2">
                {new Date(hackathon.start_date_time).toLocaleDateString()} - {new Date(hackathon.end_date_time).toLocaleDateString()}
                </p>
              <div className="md:col-span-1 mt-2 items-center flex">
                <Toggle
                  defaultChecked={hackathon.published}
                  icons={false}
                  onChange={() => handleTogglePublished(hackathon.id)}
                />
                <p className="text-sm ml-2">{hackathon.published ? '🎉 Hackathon Live' : 'Publish'}</p>
              </div>
            </div>
            {expandedHackathons[hackathon.id] && (
              <div>
                <form className="">

                  <div className="py-5 md:py-8 border-b-2 border-t-2 border-grey-500">
                    <label className="text-2xl font-bold">Hackathon Details</label>
                    <div className="grid grid-cols-8 gap-4">
                      <div className="col-span-6 md:col-span-7">
                        <label className="block text-gray-700 font-bold mb-1 mt-2">Name</label>
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
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-gray-700 font-bold mb-1 mt-2">Emoji</label>
                        <input
                          type="text"
                          name="emoji"
                          value={formData.emoji}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-3 py-2 border rounded"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="col-span-2">
                        <label className="block text-gray-700 font-bold mb-1 mt-2">Start Date</label>
                        <input
                          type="datetime-local"
                          name="start_date_time"
                          value={formData.start_date_time}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-3 py-2 border rounded"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-gray-700 font-bold mb-1 mt-2">End Date</label>
                        <input
                          type="datetime-local"
                          name="end_date_time"
                          value={formData.end_date_time}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-3 py-2 border rounded"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1 mt-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-bold mb-1 mt-2">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full h-48 px-3 py-2 border rounded"
                        required
                      />
                    </div>
                  </div>

                  <div className="py-5 md:py-8 border-b-2 border-grey-500">
                    <label className="block text-2xl text-gray-700 font-bold mb-2">Sponsors List</label>
                    <div className="space-y-2">
                      {formData.sponsors_list.map((sponsor, index) => (
                        <div key={index} className="grid grid-cols-6 gap-4 py-3 border rounded bg-gray-50">
                          <img src={sponsor.logo} alt={sponsor.name} className="col-span-2 md:col-span-1 h-10 m-auto" />
                          <div className="col-span-2 md:col-span-3">
                            <div className="ml-3 font-bold">{sponsor.name}</div>
                            <div className="ml-3 text-sm text-gray-600">{sponsor.link}</div>
                          </div>
                          <button
                            type="button"
                            className="text-red-500 col-span-2 flex items-center justify-end"
                            onClick={() => handleRemoveSponsor(index)}
                          >
                            <FaTrashAlt className="mr-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 md:grid md:grid-cols-4 md:gap-4">
                      <input
                        type="text"
                        name="name"
                        value={newSponsor.name}
                        onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
                        placeholder="Sponsor Name"
                        className="px-3 border rounded"
                      />
                      <input
                        type="text"
                        name="logo"
                        value={newSponsor.logo}
                        onChange={(e) => setNewSponsor({ ...newSponsor, logo: e.target.value })}
                        placeholder="Sponsor Logo URL"
                        className="px-3 border rounded"
                      />
                      <input
                        type="text"
                        name="link"
                        value={newSponsor.link}
                        onChange={(e) => setNewSponsor({ ...newSponsor, link: e.target.value })}
                        placeholder="Sponsor Link"
                        className="px-3 border rounded"
                      />
                      <button
                        type="button"
                        className="bg-green-500 text-white p-3 w-full mt-1 rounded"
                        onClick={handleAddSponsor}
                      >
                        Add Sponsor
                      </button>
                    </div>
                  </div>

                  <div className="py-5 md:py-8 border-b-2 border-grey-500">
                    <label className="block text-2xl text-gray-700 font-bold mb-2">Organizer Emails List</label>
                    <div className="flex flex-wrap gap-2">
                      {formData.organizer_emails_list.map((email, index) => (
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
                  </div>

                  <div className="py-5 md:py-8 border-b-2 border-grey-500">
                    <label className="block text-2xl text-gray-700 font-bold mb-2">Timeline Events List</label>
                    <div className="space-y-2">
                      {formData.timeline_events_list.map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded bg-gray-50">
                          <div className="pl-2">
                            <div className="font-bold">{event.event}</div>
                            <div className="text-sm text-gray-600">{event.start_date_time}</div>
                            <div className="text-sm text-gray-600">{event.location}</div>
                            <div className="text-sm text-gray-600">{event.instructions}</div>
                          </div>
                          <button
                            type="button"
                            className="text-red-500"
                            onClick={() => handleRemoveEvent(index)}
                          >
                            <FaTrashAlt className="mr-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <input
                        type="text"
                        name="event"
                        value={newEvent.event}
                        onChange={(e) => setNewEvent({ ...newEvent, event: e.target.value })}
                        placeholder="Event Name"
                        className="w-full px-3 py-2 mb-1 border rounded"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="datetime-local"
                          name="start_date_time"
                          value={newEvent.start_date_time}
                          onChange={(e) => setNewEvent({ ...newEvent, start_date_time: e.target.value })}
                          className="w-full px-3 py-2 mb-2 border rounded"
                        />
                        <input
                          type="text"
                          name="location"
                          value={newEvent.location}
                          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                          placeholder="Event Location"
                          className="w-full px-3 py-2 mb-2 border rounded"
                        />
                      </div>
                      <textarea
                        name="instructions"
                        value={newEvent.instructions}
                        onChange={(e) => setNewEvent({ ...newEvent, instructions: e.target.value })}
                        placeholder="Event Instructions"
                        className="w-full px-3 py-2 mb-1 border rounded"
                      />
                      <button
                        type="button"
                        className="bg-green-500 text-white px-4 py-2 rounded w-full"
                        onClick={handleAddEvent}
                      >
                        Add Event
                      </button>
                    </div>
                  </div>

                  <div className="py-5 md:py-8 border-b-2 border-grey-500">
                    <label className="block text-2xl text-gray-700 font-bold mb-2">Prizes List</label>
                    <div className="space-y-2">
                      {formData.prizes.map((prize, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded bg-gray-50">
                          <div className="pl-2">
                            <div className="font-bold">{prize.name}: ${prize.prize_money}</div>
                            <div className="text-sm text-gray-600">{prize.description}</div>
                            <div className="text-sm text-gray-600"></div>
                          </div>
                          <button
                            type="button"
                            className="text-red-500"
                            onClick={() => handleRemovePrize(index)}
                          >
                            <FaTrashAlt className="mr-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 md:grid md:grid-cols-4 gap-4 md:gap-2">
                      <input
                        type="text"
                        name="name"
                        value={newPrize.name}
                        onChange={(e) => setNewPrize({ ...newPrize, name: e.target.value })}
                        placeholder="Prize Name"
                        className="px-3 border rounded col-span-2"
                      />
                      <input
                        type="text"
                        name="prize_money"
                        value={newPrize.prize_money}
                        onChange={(e) => setNewPrize({ ...newPrize, prize_money: e.target.value })}
                        placeholder="Prize Money"
                        className="px-3 border rounded col-span-2"
                      />
                      <input
                        type="text"
                        name="description"
                        value={newPrize.description}
                        onChange={(e) => setNewPrize({ ...newPrize, description: e.target.value })}
                        placeholder="Prize Description"
                        className="px-3 border rounded col-span-3"
                      />
                      <button
                        type="button"
                        className="w-full md:col-span-1 bg-green-500 text-white px-4 mt-1 rounded py-2"
                        onClick={handleAddPrize}
                      >
                        Add Prize
                      </button>
                    </div>
                  </div>

                  <div className="py-5 md:py-8 border-b-2 border-grey-500">
                    <label className="block text-2xl text-gray-700 font-bold">Links/Resources</label>
                    <p className="mb-2 mt-1">These links will be shared conditionally to your hackers.</p>
                    <div className="grid grid-cols-4 gap-4">
                      <label className="block col-span-1 text-gray-700 m-auto text-sm md:text-base">Public:</label>
                      <input
                        type="text"
                        name="public_files_link"
                        value={formData.public_files_link}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="px-3 py-2 border rounded col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <label className="block col-span-1 text-gray-700 m-auto text-sm md:text-base">Accepted:</label>
                      <input
                        type="text"
                        name="acceptance_link"
                        value={formData.acceptance_link}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="px-3 py-2 border rounded col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <label className="block col-span-1 text-gray-700 m-auto text-sm md:text-base">Kickoff:</label>
                      <input
                        type="text"
                        name="kickoff_link"
                        value={formData.kickoff_link}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border rounded col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <label className="block col-span-1 text-gray-700 text-center m-auto text-sm md:text-base">Kickoff Time:</label>
                      <input
                        type="datetime-local"
                        name="kickoff_date_time"
                        value={formData.kickoff_date_time}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 border rounded col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-3">
                      <label className="block col-span-1 m-auto text-gray-700 text-sm md:text-base text-center">Use Discord:</label>
                      <Toggle
                        defaultChecked={formData.use_discord === 1}
                        icons={false}
                        onChange={(e) => handleToggleDiscord(hackathon.id)}
                        onBlur={handleBlur}
                        name="use_discord"
                        className="col-span-3 my-auto md:mr-auto"
                      />
                    </div>
                  </div>

                  <div className="py-5 md:py-8 border-b-2 border-grey-500">
                    <label className="block text-2xl text-gray-700 font-bold mb-2">Application Settings</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Application Open Date</label>
                        <input
                          type="datetime-local"
                          name="application_open_date_time"
                          value={formData.application_open_date_time}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-3 py-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Application Close Date</label>
                        <input
                          type="datetime-local"
                          name="application_close_date_time"
                          value={formData.application_close_date_time}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-3 py-2 border rounded"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Max Applicants</label>
                        <input
                          type="number"
                          name="max_applicants"
                          value={formData.max_applicants}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-3 py-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Max Participants</label>
                        <input
                          type="number"
                          name="max_participants"
                          value={formData.max_participants}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full px-3 py-2 border rounded"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditHackathonForm;
