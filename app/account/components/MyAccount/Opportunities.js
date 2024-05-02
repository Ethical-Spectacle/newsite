import React from 'react';

function Opportunities() {
  return (
    <div className="bg-white p-5 border border-black border-1">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Opportunities</h2>
      <p className="text-gray-600 mb-5">Get involved and join our organization's leadership</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="opportunity-card border border-gray-300 rounded-lg p-4 flex flex-col">
          <h3 className="text-xl font-semibold mb-2">Apply to be a researcher</h3>
          <p className="flex-grow text-gray-600">Join a research project or start one of your own</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScSCOT3qqiel1Pf4ejg8nESlWMi4rajNwS-9xtC7fGTDwG0Gw/viewform" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg py-1 px-3 font-semibold inline-block mt-3 border border-black border-5">
            Apply Now 🔬
          </a>
        </div>
        <div className="opportunity-card border border-gray-300 rounded-lg p-4 flex flex-col">
          <h3 className="text-xl font-semibold mb-2">Guest write for our blog</h3>
          <p className="flex-grow text-gray-600">Contribute to our community's knowledge base</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdRVO8jWOb8bF6ZDlL2ZtXl8eupC37fRA-vCZmhM9CI36p_Rg/viewform" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg py-1 px-3 font-semibold inline-block mt-3 border border-black border-5">
            Write for Us ✍️
          </a>
        </div>
        <div className="opportunity-card border border-gray-300 rounded-lg p-4 flex flex-col">
          <h3 className="text-xl font-semibold mb-2">Host an event</h3>
          <p className="flex-grow text-gray-600">Organize an event that brings other passionate members together</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdc4rY7c3oE-Xj02-v_WqRFt3sl7wnlHFYPbELvnMy0mCfITQ/viewform" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg py-1 px-3 font-semibold inline-block mt-3 border border-black border-5">
            Host an Event 🗣
          </a>
        </div>
        <div className="opportunity-card border border-gray-300 rounded-lg p-4 flex flex-col">
          <h3 className="text-xl font-semibold mb-2">Volunteer at an event</h3>
          <p className="flex-grow text-gray-600">Take a larger role in running our community</p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSehaKgizEyYAltXo3uJsLHOZJXxeatxVWL1oMpuFZ1aHTxuLw/viewform" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg py-1 px-3 font-semibold mt-3 border border-black border-5">
            Volunteer 🙌
          </a>
        </div>
      </div>
    </div>
  );
}  
export default Opportunities;
