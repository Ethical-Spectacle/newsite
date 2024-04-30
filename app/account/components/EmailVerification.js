import React from 'react';

const EmailVerification = ({ userEmail, logout }) => {
  return (
    <div className="email-verification-container">
      <h2>Email Verification Needed</h2>
      <p>
        Hi there! Before you can fully access your account, you need to verify your email address.
        We've sent a verification link to <strong>{userEmail}</strong>. Please check your inbox
        (and the spam folder, just in case) and click on the link to complete your account setup.
      </p>
      <button className='logout-button' onClick={logout}>Log Out</button>
    </div>
  );
};

export default EmailVerification;