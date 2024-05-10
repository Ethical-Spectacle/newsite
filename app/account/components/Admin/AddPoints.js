import React, { useState } from "react";

const AddPoints = ({ onSubmit, apiUrl }) => {
  const [email, setEmail] = useState("");
  const [badgeName, setBadgeName] = useState("");
  const [pointsToAdd, setPointsToAdd] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/add_points`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          badge_name: badgeName,
          points_to_add: pointsToAdd,
        }),
      });

      if (response.ok) {
        setMessage("Points successfully added!");
        setEmail("");
        setBadgeName("");
        setPointsToAdd("");
      } else {
        setMessage("Failed to add points.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="flex m-5 md:m-20 items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white border-4 border-black">
        <h2 className="mb-6 text-4xl font-bold text-black">Add Points</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="User Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none"
          />
          <select
            value={badgeName}
            onChange={(e) => setBadgeName(e.target.value)}
            className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none"
          >
            <option value="">None (just pts, no badge)</option>
            <option value="director">Director</option>
            <option value="event host">Event Host</option>
            <option value="researcher">Researcher</option>
            <option value="developer">Developer</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="volunteer">Volunteer</option>
            <option value="mentor">Mentor</option>
            <option value="judge">Judge</option>
            <option value="speaker">Speaker</option>
            <option value="sponsor">Sponsor</option>
            <option value="attendee">Attendee</option>
            <option value="winner">Winner</option>
          </select>
          <input
            type="number"
            placeholder="Points to add"
            value={pointsToAdd}
            onChange={(e) => setPointsToAdd(e.target.value)}
            required
            className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none"
          />
          <button type="submit" className="w-full p-3 bg-black text-white text-xl font-bold hover:bg-gray-700 rounded">Add Points</button>
          {message && <p className="text-black">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddPoints;
