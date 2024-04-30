import React from 'react';

const VerifyEmail = ({ userEmail, onLogout }) => {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg">Email Verification Needed</h2>
      <p className="mb-4">
        Hi there! Before you can fully access your account, you need to verify your email address.
        We've sent a verification link to <strong>{userEmail}</strong>. Please check your inbox
        (and the spam folder, just in case) and click on the link to complete your account setup.
      </p>
      <button className='btn btn-error w-full' onClick={onLogout}>Log Out</button>
    </div>
  );
};

export default VerifyEmail;
