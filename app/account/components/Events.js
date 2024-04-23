'use client';
import React from 'react'
import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../../config/config'

function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
      fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/get_upcoming_events`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const eventsJson = await response.json();
          setEvents(eventsJson);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
    };

  return (
      <div className="bg-white rounded-lg shadow-md p-4 my-10">
        <h2>Upcoming Events</h2>
        <p>
        Come and get involved in our events, network, learn about the industry,
        and gain badges.
        </p>
        {events.length > 0 ? (
        events.map((event, index) => (
            <div key={index} className="event bg-gray-100 rounded-md p-2 mt-5">
            <div className="event-info flex flex-col">
                <span className="event-name text-xl font-bold">{event.name}</span>
                <span className="event-date text-lg">{event.date}</span>
                {/*<span className="event-date">{formatDate(event.date)}</span>*/}
                {/*<span className="event-address">{event.address}</span>*/}
            </div>
            <div className="event-description text-xl mt-4">
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
  )
}

export default Events