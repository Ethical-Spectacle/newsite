import React, { useState } from 'react';
import Tasks from './Tasks';
import Levels from './Levels';

const LevelsTab = ({ userEmail }) => {

  return (
    <div className="md:my-5 p-5 bg-white shadow-md rounded-lg max-w-4xl mx-auto md:px-10">
      <Levels userEmail={userEmail} />
      <p className="">As your level increases, you get cool perks and access to secret parts of our site;)</p>
      <Tasks userEmail={userEmail} />
    </div>
  );
};

export default LevelsTab;