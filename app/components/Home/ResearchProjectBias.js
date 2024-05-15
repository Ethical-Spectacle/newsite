import React from 'react';
import { MdArrowForward } from "react-icons/md";
import { PiHandSwipeLeftDuotone } from "react-icons/pi";

const BiasProjectCarousel = () => {
  return (
    <div className="bg-white">
      <div className="scroll-container hide-scrollbar flex md:justify-center justify-start">
        <div className="w-full md:w-96 md:h-80 scroll-item border border-black border-l-2 px-5 pt-5">
          <h1 className="mt-2 md:mt-5">Project 001</h1>
          <h2 className="mt-3">Bias Detection</h2>
          <p className="pl-5 mt-2">A text classification model trained to detect generalizations, unfairness, and stereotypes in text.</p>
          <h2 className="flex flex-row justify-end pr-5 text-xl md:hidden"><PiHandSwipeLeftDuotone className="mt-3 text-4xl"/></h2>
        </div>
        <div className="w-full md:w-96 md:h-80 scroll-item border border-black  p-5">
          <p className="text-2xl font-semibold mb-2">Research.</p>
          <p className="mb-5">Model: Open source bias/fairness text classification model.</p>
          <p className="mb-5">Paper: Model architecture documentation and preformance benchmarks relative to existing models.</p>
        </div>
        <div className="w-full md:w-96 md:h-80 scroll-item border border-black border-r-2 p-5">
          {/* can someone add something here, fill the space, top right aligned */}
          <p className="text-2xl font-semibold mb-2">Hackathon.</p>
          <p className="mb-5">Scheduled for Sept. 2024, hackers will have 48 hours to implement the bias detection model in a user-ready demo, to be pitched to a panel of industry leader judges.</p>
        </div>
      </div>

    </div>
  );
};

export default BiasProjectCarousel;
