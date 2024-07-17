import React, { useState } from 'react';
import CreativeCollectives from './CreativeCollectives';
import MiniEvents from './MiniEvents';

const GetInvolvedTab = ({ userEmail }) => {

  return (
    <div className="p-5 md:my-5 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <MiniEvents />
      {/* Add hackathon signup */}
      <CreativeCollectives userEmail={userEmail} />

    </div>
  );
};

export default GetInvolvedTab;
