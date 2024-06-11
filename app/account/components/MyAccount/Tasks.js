import React, { useEffect, useState } from "react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL_PROD = "https://api.ethicalspectacle.com/";
// const API_URL_PROD = "http://127.0.0.1:5000";

function Tasks({ userEmail }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taskErrors, setTaskErrors] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});

  useEffect(() => {
    fetchTasks();
  }, [userEmail]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL_PROD}/get_user_tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const tasksJson = await response.json();
      setTasks(tasksJson);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckTask = async (endpoint, taskId, potentialPts) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, potential_pts: potentialPts }),
      });

      if (response.ok) {
        setCompletedTasks(prev => ({ ...prev, [taskId]: true }));
        setTimeout(() => {
          setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        }, 1000);  // Delay for animation
      } else {
        const errorText = await response.text();
        setTaskErrors(prev => ({ ...prev, [taskId]: errorText }));
      }
    } catch (error) {
      console.error("Error checking task:", error);
      setTaskErrors(prev => ({ ...prev, [taskId]: "Error checking task" }));
    }
  };

  return (
    <div className="bg-white p-5 border border-black border-3 w-full border-b-6">
      <h2 className="text-3xl font-semibold mb-3 my-2">Tasks</h2>
      <div className="tasks-list space-y-3 mb-3">
        {loading ? (
          <div className="text-center py-5 text-lg font-semibold">Loading tasks...</div>
        ) : error ? (
          <div className="text-center py-5 text-lg font-semibold text-red-500">
            Error: {error}
          </div>
        ) : tasks.length > 0 ? (
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className={`task-card p-3 border border-gray-300 shadow-sm rounded-lg flex flex-col items-start ${completedTasks[task.id] ? 'completed' : ''}`}
              >
                <div className="flex w-full justify-between items-center">
                  <div>
                    <div className="flex-1">
                      <Tippy content={task.description} trigger="click">
                        <span className="block font-semibold text-lg cursor-pointer">{task.title}</span>
                      </Tippy>
                    </div>
                    {taskErrors[task.id] && (
                      <div className="flex mt-1 text-xs text-red-500">
                        {taskErrors[task.id]}
                      </div>
                    )}
                  </div>
                  <div className="flex-none">
                    <button
                      onClick={() => handleCheckTask(task.endpoint_url, task.id, task.potential_pts)}
                      className="w-full h-full px-3 py-3 bg-black text-white rounded-md text-xs"
                    >
                      +{task.potential_pts} pts
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            <p className="text-sm text-center">*click a task title for a description of the requirements, and potential points*</p>
          </AnimatePresence>
        ) : (
          <div className="text-center py-5 text-lg font-semibold">
            No tasks available.
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
