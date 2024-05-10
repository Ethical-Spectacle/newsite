import React, { useState } from "react";

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
    <div className="flex m-5 md:m-20 items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white border-4 border-black">
        <h2 className="mb-6 text-4xl font-bold text-black">Mint Hackathon Certificate</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="User Email"
            required
            className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none"
          />
          <input
            type="text"
            name="hackathonName"
            value={hackathonName}
            onChange={(e) => setHackathonName(e.target.value)}
            placeholder="Hackathon Name"
            required
            className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none"
          />
          <input
            type="text"
            name="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team Name"
            className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none"
          />
          <input
            type="text"
            name="award"
            value={award}
            onChange={(e) => setAward(e.target.value)}
            placeholder="Award (Optional)"
            className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none"
          />
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none"
          />
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none"
          />
          <input
            type="text"
            name="repoLink"
            value={repoLink}
            onChange={(e) => setRepoLink(e.target.value)}
            placeholder="Repository Link"
            className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none"
          />
          <button type="submit" className="w-full p-3 bg-black text-white text-xl font-bold hover:bg-gray-700 rounded">Mint Certificate</button>
          {message && <p className="text-black">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default MintHthonCertificate;
