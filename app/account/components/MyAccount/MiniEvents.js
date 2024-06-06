import React, { useEffect, useState } from "react";
const API_URL_PROD = "https://api.ethicalspectacle.com/";

function MiniEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL_PROD}/get_upcoming_events`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const eventsJson = await response.json();
      setEvents(eventsJson);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    minute = minute < 10 ? "0" + minute : minute;

    return `${month}/${day}/${year}, ${hour}:${minute} ${ampm}`;
  };
  return (
    <div className="bg-white p-5 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Upcoming Events 📅
      </h2>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 flex flex-col"
            >
              <div className="flex justify-between items-apart">
                <div className="block font-semibold text-xl text-left">
                  {event.name}
                </div>
                {event.url && (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-lg py-2 px-3 font-semibold mt-1 border border-black border-5"
                  >
                    Sign Up :)
                  </a>
                )}
              </div>

              <div className="text-sm text-gray-500 mt-2">
                {formatDate(event.date)}
              </div>
              <div className="text-sm text-gray-500">{event.address}</div>

              <div className="text-gray-600 mt-2">{event.description}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500">
          We'll post some events soon, miss you too😢
        </div>
      )}
    </div>
  );
}

export default MiniEvents;
