'use client';
import React, { useState } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

const InfoCard = ({ hackathon }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 flex flex-col mb-4">
      <div className="block font-semibold text-xl text-left pt-3 pb-5 md:pb-10 flex flex-row">
        {hackathon.sponsors_list.map((sponsor, index) => (
          <a href={sponsor.link} target="_blank" rel="noopener noreferrer" key={index}>
            <img src={sponsor.logo} alt={sponsor.name} className="h-10 md:h-16 px-2 md:px-3" />
          </a>
        ))}
      </div>

      <div className="flex justify-between items-center cursor-pointer" onClick={toggleExpand}>
        <div>
          <div className="flex flex-row">
            <div className="mt-1">{expanded ? <FaChevronDown size={20} /> : <FaChevronRight size={20} />}</div>
            <h2 className="pl-1">{hackathon.name}</h2>
          </div>
          <h3 className="text-base md:text-xl mt-4">
            {formatDate(hackathon.start_date_time)} - {formatDate(hackathon.end_date_time)}
          </h3>
          <h3 className="text-base md:text-xl py-1">Badge: {hackathon.emoji}</h3>
          <h3 className="text-base md:text-xl text-gray-500 mb-2">{hackathon.location}</h3>
        </div>
      </div>

      {expanded && (
        <div className="">
          <div className="text-gray-600 mt-2">{hackathon.description}</div>

          {hackathon.url && (
            <a href={hackathon.url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg py-2 px-3 font-semibold mt-1 border border-black border-5">Hackathon Info/Resources</a>
          )}

          {hackathon.prizes && hackathon.prizes.length > 0 && (
            <div className="text-gray-600 mt-4 mb-5">
              <span className="font-semibold">Prizes:</span>
              <div className="list-disc ml-5 mt-2">
                {hackathon.prizes.map((prize, index) => (
                  <div key={index}>
                    <span className="font-semibold">{prize.name}:</span> 
                    {prize.description} (${prize.prize_money})
                  </div>
                ))}
              </div>
            </div>
          )}

          {hackathon.organizer_emails_list && hackathon.organizer_emails_list.length > 0 && (
            <div className="text-gray-600 mt-4 mb-2">
              <span className="font-semibold">Organizers:</span>
              <div className="ml-5 mt-2">
                {hackathon.organizer_emails_list.map((email, index) => (
                  <div key={index}>{email}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InfoCard;
