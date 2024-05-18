import { useState } from 'react';

const API_URL_PROD = "https://api.ethicalspectacle.com/";

const Tasks = () => {
  const [minScore, setMinScore] = useState('');
  const [maxScore, setMaxScore] = useState('');
  const [potentialPoints, setPotentialPoints] = useState('');
  const [endpointUrl, setEndpointUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleAddTask = async () => {
    const taskData = {
      min_score: parseInt(minScore, 10),
      max_score: parseInt(maxScore, 10),
      potential_pts: parseInt(potentialPoints, 10),
      endpoint_url: endpointUrl
    };

    try {
      const response = await fetch(`${API_URL_PROD}/add_task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        setMessage('Task added successfully!');
        setMinScore('');
        setMaxScore('');
        setPotentialPoints('');
        setEndpointUrl('');
      } else {
        const errorData = await response.json();
        setMessage(`Failed to add task: ${errorData.message}`);
      }
    } catch (error) {
      setMessage(`Failed to add task: ${error.message}`);
    }
  };

  return (
    <div className="flex m-5 md:m-20 items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white border-4 border-black">
        <h2 className="mb-6 text-4xl font-bold text-black">Add New Task</h2>
        <form onSubmit={(e) => {e.preventDefault(); handleAddTask();}} className="space-y-3">
          <input
            type="number"
            name="minScore"
            value={minScore}
            onChange={(e) => setMinScore(e.target.value)}
            placeholder="Min Score"
            required
            className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none"
          />
          <input
            type="number"
            name="maxScore"
            value={maxScore}
            onChange={(e) => setMaxScore(e.target.value)}
            placeholder="Max Score"
            required
            className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none"
          />
          <input
            type="number"
            name="potentialPoints"
            value={potentialPoints}
            onChange={(e) => setPotentialPoints(e.target.value)}
            placeholder="Potential Points"
            required
            className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none"
          />
          <input
            type="text"
            name="endpointUrl"
            value={endpointUrl}
            onChange={(e) => setEndpointUrl(e.target.value)}
            placeholder="Check Endpoint URL"
            required
            className="w-full p-4 text-lg text-black bg-white border-2 border-black focus:outline-none"
          />
          <button type="submit" className="w-full p-3 bg-black text-white text-xl font-bold hover:bg-gray-700 rounded">Add Task</button>
          {message && <p className="text-black">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Tasks;
