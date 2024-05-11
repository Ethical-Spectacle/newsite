'use client';

import React, { useEffect, useState } from 'react';

const CertificatePage = () => {
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const certificateId = query.get('id');

    if (certificateId) {
      fetch(`https://api.ethicalspectacle.com/hackathon_certificate/${certificateId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setCertificate(data);
        })
        .catch(error => {
          setError(`Failed to fetch certificate: ${error.message}`);
          console.error('There was a problem with your fetch operation:', error);
        });
    }
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center m-5 md:m-20">
        <div className="p-8 border-4 border-black bg-white">
          <p className="text-xl text-black">{error}</p>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="flex items-center justify-center m-5 md:m-20">
        <div className="p-8 border-4 border-black bg-white">
          <p className="text-xl text-black">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center m-5 my-10 md:m-20">
      <div className="w-full max-w-2xl p-8 bg-white border-4 border-black shadow-lg rounded-lg">
        <div className="absolute inset-0 m-2 rounded-lg"></div>
        {/* logos */}
        <div className="flex flex-row justify-center my-8 mx-5">
          <img src="/assets/dark_logo_no_bg.png" alt="Ethical Spectacle Research Logo" className="h-16 md:h-25" />
          <span className="mx-3 text-xl font-bold my-3">X</span>
          <img src="/assets/AZVC_Transparent.png" alt="AZVC Logo" className="h-16 md:h-25"/>
        </div>
        <h1 className="mb-4 text-4xl font-bold text-center text-black">Certificate of Completion</h1>
        <h2 className="mb-2 text-3xl font-semibold text-center text-black">{certificate.hackathon_name}</h2>
        <div className="md:flex justify-between text-center mt-5">
          <p className="text-lg text-black">Awarded to: {certificate.fname} {certificate.lname}</p>
          <p className="text-lg text-black">Team: {certificate.team_name}</p>
        </div>
        {certificate.award && <p className="text-lg text-black text-center mt-3">Award: {certificate.award}</p>}
        <p className="text-lg text-black text-center mt-3">{formatDate(certificate.start_date)} - {formatDate(certificate.end_date)}</p>
        {certificate.claimed === 0 && <p className="text-lg text-red-600 text-center">This certificate is unclaimed. Go to your account page to claim it.</p>}
        
        {certificate.repo_link && <p className="text-lg text-black mt-5 text-center"><a href={certificate.repo_link} className="text-blue-500">Project Repo</a></p>}

       <div className="flex flex-wrap justify-around mt-5">
          
          {certificate.website && <p className="text-lg text-black"><a href={certificate.website} className="text-blue-500">Website</a></p>}
          {certificate.github && <p className="text-lg text-black"><a href={certificate.github} className="text-blue-500">GitHub</a></p>}
          {certificate.linkedin && <p className="text-lg text-black"><a href={certificate.linkedin} className="text-blue-500">LinkedIn</a></p>}
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
