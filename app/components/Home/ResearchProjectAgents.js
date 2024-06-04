import React from "react";
import { PiHandSwipeLeftDuotone } from "react-icons/pi";

const AgentsProjectCarousel = () => {
  return (
    <div className="bg-white sm:bg-black sm:py-10">
      <div className="scroll-container hide-scrollbar flex md:justify-center justify-start">
        <div className="w-96 scroll-item border border-black sm:border-white border-l-2 px-5 pt-5 sm:text-white">
          <h1 className="mt-2">Project 002</h1>
          <h2 className="mt-3">Agent Network Effects</h2>
          <p className="pl-5 mt-2 sm:text-white">
            We're studying the ability of LLM agents to police network effects.
          </p>
          <h2 className="flex flex-row justify-end pr-5 text-xl md:hidden">
            <PiHandSwipeLeftDuotone className="mt-5 text-4xl" />
          </h2>
        </div>

        <div className="w-96 scroll-item border border-black sm:border-white sm:text-white p-5">
          <p className="text-2xl font-semibold mb-2 sm:text-white">Research.</p>
          <p className="mb-5 sm:text-white">
            Platform: Environment for LLM agents to interact with eachother at
            scale, spreading ideas.
          </p>
          <p className="mb-5 sm:text-white">
            Paper: Can a network of LLM agents effectively filter out toxic
            ideas, while promoting good ones?
          </p>
        </div>

        <div className="w-96 scroll-item border border-black sm:border-white sm:text-white border-r-2 p-5">
          {/* can someone add something here, fill the space, top right aligned */}
          <p className="text-2xl font-semibold mb-2 sm:text-white">
            Hackathon.
          </p>
          <p className="mb-5 sm:text-white">
            Scheduled for Oct. 2024, participants get 48 hours to build a
            front-end application that interacts with our API, designing the
            logic for when/which agents interact. A demo of the applicaiton will
            be pitched to a panel of private capital investors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentsProjectCarousel;
