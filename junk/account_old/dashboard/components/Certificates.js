import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config/config';

const CertificatesList = ({ userEmail }) => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCertificates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/get_certificates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail }), 
      });
      if (!response.ok) throw new Error('Failed to fetch certificates');
      const data = await response.json();
      setCertificates(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, [userEmail]); 

  const claimCertificate = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/claim_hackathon_certificate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ certificate_id: id, email: userEmail })
      });
      const data = await response.json();
      if (data.success) {
        fetchCertificates();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error claiming certificate:', error);
      alert('Error occurred while claiming the certificate.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="certificates-list">
      {certificates.map((cert, index) => (
        <div key={index} className="flex flex-col justify-center border  border-gray-300 bg-white px-3 py-2 rounded-lg w-fit min-w-[250px]">
          <span className='text-lg font-semibold'>{cert.hackathon_name} - {cert.team_name}</span>
          <p className='text-base'>Dates:</p>
          <p className='text-base'>{cert.start_date} To: {cert.end_date}</p>
          {cert.claimed ? (
            <a href={`/#/hackathon-certificate/${cert.id}`} className='underline decoration-cpink decoration-2 underline-offset-4' >View Certificate</a>
          ) : (
            <button onClick={() => claimCertificate(cert.id)} className="claim-btn">Claim</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CertificatesList;