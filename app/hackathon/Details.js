import React, { useState } from 'react';

const HackathonDetails = ({ hackathon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date) => {
    const optionsDate = { month: 'short', day: 'numeric', year: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
    return `${new Date(date).toLocaleDateString('en-US', optionsDate)} ${new Date(date).toLocaleTimeString('en-US', optionsTime)}`;
  };

  const startDateTime = hackathon?.hackathon_info?.start_date_time ? formatDate(hackathon.hackathon_info.start_date_time) : null;
  const endDateTime = hackathon?.hackathon_info?.end_date_time ? formatDate(hackathon.hackathon_info.end_date_time) : null;

  return (
    <div className="w-full max-w-3xl p-8 bg-gray-20 shadow-lg rounded-lg">
      <div className="flex justify-center mb-5">
        {hackathon?.hackathon_info?.sponsors_list?.map((sponsor, index) => (
          <a key={index} href={sponsor.link} target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src={sponsor.logo} alt={sponsor.name} className="h-16" />
          </a>
        ))}
      </div>
      <h1 className="mb-4 text-4xl font-bold text-center text-black">{hackathon?.hackathon_info?.name}</h1>
      <p className="text-2xl text-gray-600 text-center mt-5">{hackathon?.hackathon_info?.location}</p>
      {startDateTime && endDateTime && (
        <p className="text-xl text-gray-500 text-center mb-5">
          {startDateTime} - {endDateTime}
        </p>
      )}
      <button 
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 my-4 mx-auto block"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Hide Details' : 'Show Details'}
      </button>
      {hackathon?.hackathon_info?.public_files_link && (
        <div className="text-center mt-5 mb-5">
          <a href={hackathon.hackathon_info.public_files_link} target="_blank" rel="noopener noreferrer" className="text-black underline hover:underline">
            Study Resources 🧠
          </a>
      </div>
      )}
      {isExpanded && (
        <>
          <p className="text-lg text-gray-600 text-center mb-5">{hackathon?.hackathon_info?.description}</p>
          {hackathon?.hackathon_info?.prizes?.length > 0 && (
            <div className="text-center mt-5">
              <h2 className="text-2xl font-bold">Prizes</h2>
              <ul className="list-disc list-inside">
                {hackathon.hackathon_info.prizes.map((prize, index) => (
                  <div key={index} className="text-lg text-gray-600">
                    <p><strong>{prize.name}</strong>: {prize.description} - ${prize.prize_money}</p>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default HackathonDetails;
