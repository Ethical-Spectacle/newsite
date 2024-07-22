'use client';
import React, { useEffect, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import { Typography, Paper, Collapse } from '@mui/material';

const { API_URL_PROD } = require('../../../../config/config');

const HackathonTimeline = ({ hackathonId }) => {
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await fetch(`${API_URL_PROD}/get_hackathon_timeline`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ hackathon_id: hackathonId }),
        });
        const data = await response.json();
        setTimelineEvents(data);
      } catch (error) {
        console.error('Error fetching timeline:', error);
      }
    };

    fetchTimeline();
  }, [hackathonId]);

  if (!timelineEvents.length) {
    return <div>Loading timeline...</div>;
  }

  const handleExpandClick = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const groupEventsByDay = (events) => {
    return events.reduce((acc, event) => {
      const date = new Date(event.start_date_time).toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});
  };

  const groupedEvents = groupEventsByDay(timelineEvents);

  return (
    <div className="border border-gray-300 m-4 p-5 rounded-lg md:flex md:justify-center">
      {Object.keys(groupedEvents).map((day, idx) => (
        <div key={idx}>
          <h1 className="font-semibold text-black text-2xl rounded-md">{day}</h1>
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.1,
              },
            }}
          >
            {groupedEvents[day].map((event, index) => (
              <TimelineItem key={index} >
                
                <TimelineOppositeContent color="textSecondary">
                  {new Date(event.start_date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineDot color="primary"/>
                  {index < groupedEvents[day].length - 1 && <TimelineConnector />}
                </TimelineSeparator>

                <TimelineContent className="">
                  <div className="px-2 py-1 cursor-pointer" onClick={() => handleExpandClick(`${day}-${index}`)}>
                    <h2 className="text-xl">{event.event}</h2>
                    <p className="text-base">{event.location}</p>

                    <Collapse in={expanded[`${day}-${index}`]} timeout="auto" unmountOnExit>
                      <p className="text-sm w-full">{event.instructions}</p>
                    </Collapse>
                  </div>
                </TimelineContent>

              </TimelineItem>
            ))}
          </Timeline>
        </div>
      ))}
    </div>
  );
};

export default HackathonTimeline;
