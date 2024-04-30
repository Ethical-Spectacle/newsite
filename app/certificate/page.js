'use client';

import React, { useEffect, useState } from 'react';

const CertificatePage = () => {
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const certificateId = query.get('id');

    if (certificateId) {
      fetch(`http://127.0.0.1:5000/hackathon_certificate/${certificateId}`) 
      // fetch(`https://api.ethicalspectacle.com/hackathon_certificate/${certificateId}`)
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
    return <div>Error: {error}</div>;
  }

  if (!certificate) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Certificate of Completion</h1>
      <h2>{certificate.hackathon_name}</h2>
      <p>Awarded to: <strong>{certificate.fname} {certificate.lname}</strong></p>
      <p>Team: {certificate.team_name}</p>
      <p>Award: {certificate.award}</p>
      <p>Dates: {certificate.start_date} to {certificate.end_date}</p>
      {certificate.claimed === 0 && <p style={{ color: 'red' }}>This certificate is unclaimed. Go to your account page to claim it.</p>}
      <div>
        {certificate.repo_link && <p>Repo: <a href={certificate.repo_link}>{certificate.repo_link}</a></p>}
        {certificate.website && <p>Personal Website: <a href={certificate.website}>{certificate.website}</a></p>}
        {certificate.github && <p>GitHub: <a href={certificate.github}>{certificate.github}</a></p>}
        {certificate.linkedin && <p>LinkedIn: <a href={certificate.linkedin}>{certificate.linkedin}</a></p>}
      </div>
    </div>
  );
};

export default CertificatePage;
