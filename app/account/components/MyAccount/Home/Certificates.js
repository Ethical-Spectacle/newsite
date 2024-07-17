import React, { useState, useEffect } from 'react';
const { API_URL_PROD } = require('../../../../config/config');

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="bg-white px-5 pt-5 pb-10 w-full">
      <h1 className="text-3xl font-semibold mb-3">Certificates</h1>
  
      {loading && <div className="loading text-center py-5 text-xl font-semibold">Loading...</div>}
      {error && <div className="error text-center py-5 text-red-500 font-semibold">Error: {error}</div>}
  
      <div className="certificates-list space-y-4">
        {certificates.length > 0 ? (
          certificates.map(cert => (
            <div key={cert.id} className="certificate-card p-3 border border-gray-300 shadow-sm rounded-lg">
              <h2 className="text-2xl font-semibold">{cert.hackathon_name} - {cert.team_name}</h2>
              <p className="text-sm font-light">Dates: {formatDate(cert.start_date)} to {formatDate(cert.end_date)}</p>
              {cert.claimed ? (
                <a href={`/certificate?id=${cert.id}`} className="view-link inline-block mt-2 text-blue-500 hover:text-blue-700">View Certificate</a>
              ) : (
                <button onClick={() => claimCertificate(cert.id)} className="claim-btn mt-2 bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-700">Claim</button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-5 text-lg font-semibold">Compete in a hackathon to get your first certificate📃</div>
        )}
      </div>
    </div>
  );  
};

export default CertificatesList;

