"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaArrowRight } from "react-icons/fa";
import Loader from "@/Loader/Loader";

const { API_URL_PROD } = require("../config/config");

const ResearchProjects = () => {
  const { isLoggedIn, userEmail } = useAuth();
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState({});
  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL_PROD}/get_all_research_projects`);
        const data = await res.json();
        const publishedProjects = data.filter(
          (project) => project.published === 1
        );
        setProjects(publishedProjects);
        if (isLoggedIn) {
          publishedProjects.forEach((project) => fetchApplications(project.id));
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchApplications = async (projectId) => {
      try {
        const res = await fetch(
          `${API_URL_PROD}/get_user_research_applications`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userEmail }),
          }
        );
        const data = await res.json();
        const userApplication = data.find(
          (app) => app.project_id === projectId
        );
        if (userApplication) {
          setApplications((prev) => ({
            ...prev,
            [projectId]: userApplication.status,
          }));
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchProjects();
  }, [isLoggedIn, userEmail]);

  const applyForProject = async (project_id) => {
    try {
      const response = await fetch(
        `${API_URL_PROD}/submit_researcher_application`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            project_id,
            email: userEmail,
          }),
        }
      );
      if (response.ok) {
        setApplications((prev) => ({
          ...prev,
          [project_id]: "pending",
        }));
        setErrorMessages((prev) => ({
          ...prev,
          [project_id]: "", // Clear error message on successful application
        }));
      } else {
        const errorText = await response.text();
        setErrorMessages((prev) => ({
          ...prev,
          [project_id]: errorText,
        }));
      }
    } catch (error) {
      console.error("Error applying for project:", error);
      setErrorMessages((prev) => ({
        ...prev,
        [project_id]: "An unexpected error occurred.",
      }));
    }
  };

  return (
    <div className="bg-white py-3 container mx-auto px-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        Research Projects
      </h1>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-gray-300 rounded-lg p-4 flex flex-col"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl text-black">
                    <a
                      href={`research-project?id=${project.id}`}
                      className="hover:underline flex items-center"
                    >
                      {project.title}
                      <FaArrowRight className="text-base ml-1" />
                    </a>
                  </h2>
                  <h3 className="text-base md:text-xl text-gray-500 mb-2">
                    {project.description}
                  </h3>
                </div>
              </div>

              {isLoggedIn ? (
                applications[project.id] ? (
                  <p className="text-green-600 font-semibold mt-2">
                    Status: {applications[project.id]}
                  </p>
                ) : (
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-600"
                    onClick={() => applyForProject(project.id)}
                  >
                    Apply
                  </button>
                )
              ) : (
                <p className="text-red-600 mt-2">Sign in to apply</p>
              )}

              {errorMessages[project.id] && (
                <p className="text-red-600 mt-2 text-sm">
                  {errorMessages[project.id]}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ResearchProjects;
