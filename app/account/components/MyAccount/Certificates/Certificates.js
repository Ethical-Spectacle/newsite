import React, { useState, useEffect } from 'react';
const API_URL_PROD =
  "https://api.ethicalspectacle.com/";

const CertificatesList = ({ userEmail }) => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCertificates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL_PROD}/get_certificates`, {
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
      const response = await fetch(`${API_URL_PROD}/claim_hackathon_certificate`, {
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
    <div className="bg-zinc-200 p-2 md:px-5">
      <h1 className="text-2xl underline mb-2">Certificates</h1>
      {certificates.map(cert => (
        <div key={cert.id} className="certificate-card text-xl">
          <h2 className="text-2xl">{cert.hackathon_name} - {cert.team_name}</h2>
          <p className='text-xl'>Dates: {cert.start_date} to {cert.end_date}</p>
          {cert.claimed ? (
            <a href={`/#/hackathon-certificate/${cert.id}`} className="view-link">View Certificate</a>
          ) : (
            <button onClick={() => claimCertificate(cert.id)} className="claim-btn">Claim</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CertificatesList;

