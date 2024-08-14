import React from 'react';

const EmailVerification = ({ userEmail, logout }) => {
  return (
    <div className="flex items-center justify-center m-5 md:m-20">
      <div className="w-full max-w-md p-8 bg-white border-2 rounded-lg my-10">
        <h2 className="mb-6 text-4xl font-bold text-black text-center">📬 Email Verification Needed</h2>
        <p className="text-lg text-black text-center mb-3">
          We've sent a verification link to <strong>{userEmail}</strong>. Please check your inbox
          (and the spam folder, just in case).
        </p>
        <button className="mt-4 w-full p-3 bg-black text-white text-xl font-bold hover:bg-gray-700 rounded" onClick={logout}>Log Out</button>
      </div>
    </div>
  );
};

export default EmailVerification;
