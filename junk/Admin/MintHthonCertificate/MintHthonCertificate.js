import React, { useState } from "react";
import './MintHthonCertificate.css';

const MintHthonCertificate = ({ apiUrl }) => {
  const [email, setEmail] = useState("");
  const [certificateName, setCertificateName] = useState("");
  const [hackathonName, setHackathonName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [award, setAward] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/add_certificate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          hackathon_name: hackathonName,
          team_name: teamName,
          award: award,
          start_date: startDate,
          end_date: endDate,
          repo_link: repoLink
        }),
      });

      if (response.ok) {
        setMessage("Certificate successfully added!");
        setEmail("");
        setCertificateName("");
        setHackathonName("");
        setTeamName("");
        setAward("");
        setStartDate("");
        setEndDate("");
        setRepoLink("");
      } else {
        setMessage("Failed to add certificate.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
      console.log("Error minting certificate:", error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Mint Hackathon Certificate:</h2>
      <p>Use this to mint a new hackathon certificate for a participant. You can mint it with their email address even if they havent signed up, and they'll get a button to claim it when they create their account. Let's add mass minting with CSVs later.</p>
      <div>
        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Hackathon Name"
          value={hackathonName}
          onChange={(e) => setHackathonName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Award (Optional) *shows up verbatim on the certificate*"
          value={award}
          onChange={(e) => setAward(e.target.value)}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Repository Link"
          value={repoLink}
          onChange={(e) => setRepoLink(e.target.value)}
        />
      </div>
      <button type="submit">Mint Certificate</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default MintHthonCertificate;
