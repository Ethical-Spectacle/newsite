import React, { useState } from 'react';
import ProfileInfo from './ProfileInfo';
import Badges from './Badges';
import Certificates from './Certificates';

const HomeTab = ({ userEmail }) => {

  return (
    <div className="md:mt-5 md:p-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <ProfileInfo userEmail={userEmail} />
      <Badges userEmail={userEmail} />
      <Certificates userEmail={userEmail} />
    </div>
  );
};

export default HomeTab;
