import React, { useState } from 'react';
import CreativeCollectives from './CreativeCollectives';
import MiniEvents from '../../../../events/MiniEvents';
import Hackathons from '../../../../events/Hackathons';

const GetInvolvedTab = ({ userEmail }) => {

  return (
    <div className="py-5 md:my-5 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <Hackathons />
      <MiniEvents />      
      <CreativeCollectives userEmail={userEmail} />
    </div>
  );
};

export default GetInvolvedTab;
