import React, { useState } from "react";

const AddPoints = ({ onSubmit, apiUrl }) => {
  const [email, setEmail] = useState("");
  const [badgeName, setBadgeName] = useState("");
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
        }),
      });

      if (response.ok) {
        setMessage("Points successfully added!");
        setEmail("");
        setBadgeName("");
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
        <h2 className="mb-6 text-4xl font-bold text-black">Add badge</h2>
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
            <option value="director">🤖Director - 3</option>
            <option value="event_host">🎤Event Host - 2</option>
            <option value="researcher">🔬Researcher - 3</option>
            <option value="developer">💻Developer - 1</option>
            <option value="entrepreneur">🚀Entrepreneur - 1</option>
            <option value="volunteer">🤝Volunteer - 1</option>
            <option value="mentor">🧠Mentor - 2</option>
            <option value="judge">⚖️Judge - 3</option>
            <option value="speaker">🗣️Speaker - 1</option>
            <option value="sponsor">🌟Sponsor - 1</option>
            <option value="event attendee">👥Attendee - 1</option>
            <option value="winner">🏆Winner - 3</option>
            <option value="ecohacker">🌱Ecohacker (sustainability hthon) - 3</option>
            <option value="eco_first_place">🥇First Place (sustainability hthon) - 3</option>
            <option value="eco_second_place">🥈Second Place (sustainability hthon) - 2</option>
            <option value="eco_third_place">🥉Third Place (sustainability hthon) - 1</option>
            <option value="eco_creative">🎨Most Creative (sustainability hthon) - 1</option>
          </select>
          <button type="submit" className="w-full p-3 bg-black text-white text-xl font-bold hover:bg-gray-700 rounded">Add Points</button>
          {message && <p className="text-black">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddPoints;
