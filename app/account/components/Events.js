'use client';
import React from 'react'
import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../../config/config'
import formatDate from '../utils/formatDate';

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
      <div className="flex relative">

        <div className='absolute top-28 -left-20 -rotate-90 md:-left-28 md:top-32'>
          <h2>Upcoming Events</h2>
        </div>

        <div className='h-full border-l border-slate-800 ml-8 px-4 py-12 space-y-4'>
          <p>
            Come and get involved in our events, network, learn about the industry,
            and gain badges.
          </p>
          {events.length > 0 ? (
          events.map((event, index) => (
              <div key={index} className="bg-white px-2 py-4 border border-slate-800 -mr-4">
                <div className="event-info flex flex-col">
                    <span className="text-xl bg-pink-200 rounded-full p-2 border border-slate-800 w-fit">
                      {event.name}
                    </span>
                    <span className="event-date text-lg">{formatDate(event.date)}</span>
                </div>
                <div className="event-description text-xl mt-4">
                    <p>{event.description}</p>
                    {event.url && (
                    <a href={event.url} target="_blank" rel="noopener noreferrer" className='underline decoration-cpink decoration-4 underline-offset-4'>
                        More Info →
                    </a>
                    )}
                </div>
              </div>
          ))
          ) : (
          <div>No Upcoming Events</div>
          )}
        </div>
    </div>
  )
}

export default Events