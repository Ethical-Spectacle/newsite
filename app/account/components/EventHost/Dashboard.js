import React, { useState } from 'react';
import AddHackathonForm from './AddHackathonForm';
import EditHackathonForm from './EditHackathonForm';
import AddEventForm from './AddEventForm'; 
import EditEventForm from './EditEventForm';

const EventHostDashboard = ({ userEmail }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleHackathonAdded = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const handleEventAdded = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-3 md:mb-5 border border-0 border-b-2 border-gray-400 pb-3">Event Host Dashboard</h2>
      <div className="border border-0 border-b-2 border-gray-300">
        <AddEventForm userEmail={userEmail} onEventAdded={handleEventAdded} />
        <AddHackathonForm userEmail={userEmail} onHackathonAdded={handleHackathonAdded} />
      </div>
      <EditEventForm key={`edit-event-form-${refreshKey}`} userEmail={userEmail} />
      <EditHackathonForm key={`edit-hackathon-form-${refreshKey}`} userEmail={userEmail} />
    </div>
  );
};

export default EventHostDashboard;
