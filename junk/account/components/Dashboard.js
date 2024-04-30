import React from 'react';

const Dashboard = ({ userEmail, onLogout }) => {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg">Welcome to your Dashboard!</h2>
      <p>User Email: {userEmail}</p>
      <button className="btn btn-error w-full" onClick={onLogout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
