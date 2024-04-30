import React from 'react';

const AdminDashboard = ({ onLogout }) => {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg">Admin Dashboard</h2>
      {/* Implement Admin-specific Components Here */}
      <button className="btn btn-error w-full" onClick={onLogout}>Log Out</button>
    </div>
  );
};

export default AdminDashboard;
