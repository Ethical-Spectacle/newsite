import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

const colors = ['#1E90FF', '#32CD32', '#FF4500', '#FFD700', '#9370DB', '#FFA500'];

const ProjectTimeline = ({ timelineList }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const handleToggleDescription = (index) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="w-full mb-4 border border-gray-300 rounded-lg p-4">
      <h3 className="text-xl font-semibold">Project Timeline</h3>
      <div className="flex overflow-x-auto hide-scrollbar">
        <Timeline position="right">
          {timelineList && Array.isArray(timelineList) && timelineList
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((event, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot style={{ backgroundColor: colors[index % colors.length] }} />
                  {index !== timelineList.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography
                    variant="h6"
                    component="span"
                    onClick={() => handleToggleDescription(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {event.title}
                  </Typography>
                  <p className="text-base">{new Date(event.date).toLocaleDateString()}</p>
                  {expandedItems[index] && (
                    <p className="text-sm text-gray-500">
                      {event.description}
                    </p>
                  )}
                </TimelineContent>
              </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  );
};

export default ProjectTimeline;
