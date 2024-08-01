import React from 'react';

const ProjectPapers = ({ papersList }) => {
  return (
    <div className="w-full mb-4 border border-gray-300 rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-2">Research Papers</h3>
      <div className="flex flex-col space-y-4">
        {papersList && papersList.length > 0 ? (
          papersList.map((paper, index) => (
            <div key={index} className="bg-white py-3 px-4 border border-gray-300 rounded-lg">
              <h4 className="text-lg font-semibold">{paper.title}</h4>
              <p className="text-base text-gray-500 mb-2">Credits: {paper.credits}</p>
              {paper.link && paper.link !== "" ? (
                <a href={paper.link} className="text-blue-500 hover:underline">Read Paper</a>
              ) : (
                <p className="text-base text-gray-500">Not yet published</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No papers yet... workin' on it</p>
        )}
      </div>
    </div>
  );
};

export default ProjectPapers;
