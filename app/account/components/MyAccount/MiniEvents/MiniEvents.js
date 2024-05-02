import React, { useEffect, useState } from "react";
import "./MiniEvents.css";
const API_URL_PROD =
  "https://api.ethicalspectacle.com/";

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
    <div className="border border-black space-y-5 p-2 md:px-5 min-h-[200px]">
      <h2>Upcoming Events</h2>
      <p>
        Come and get involved in our events, network, learn about the industry,
        and gain badges.
      </p>
      {events.length > 0 ? (
        events.map((event, index) => (
          <div key={index} className="event">
            <div className="event-info">
              <span className="event-name">{event.name}</span>
              <span className="event-date">Date to be announced soon</span>
              {/*<span className="event-date">{formatDate(event.date)}</span>*/}
              {/*<span className="event-address">{event.address}</span>*/}
            </div>
            <div className="event-description">
              {event.description}
              {/*
              {event.url && (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-link"
                >
                  More Info →
                </a>
              )}
              */}
            </div>
          </div>
        ))
      ) : (
        <div>No Upcoming Events</div>
      )}
    </div>
  );
}

export default MiniEvents;
