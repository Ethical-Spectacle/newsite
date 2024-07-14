import React, { useState } from 'react';
import AddHackathonForm from './AddHackathonForm';
import EditHackathonForm from './EditHackathonForm';

const EventHostDashboard = ({ userEmail }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleHackathonAdded = () => {
    setRefreshKey(refreshKey + 1);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-3 md:mb-8">Event Host Dashboard</h2>
      <AddHackathonForm userEmail={userEmail} onHackathonAdded={handleHackathonAdded} />
      <EditHackathonForm key={refreshKey} userEmail={userEmail} />
      {/* Additional components for Event Host Dashboard can be added here */}
    </div>
  );
};

export default EventHostDashboard;
