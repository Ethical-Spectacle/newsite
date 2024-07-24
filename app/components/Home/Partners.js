import React from "react";

const Partners = () => {
  return (
    <div className="bg-white">
      <div className="scroll-container hide-scrollbar flex md:justify-start justify-start">

        {/* Title slide */}
        <div className="w-96 scroll-item bg-black">
          <div className="flex flex-col h-full justify-end">
            <h1 className="mt-5 pb-5 text-5xl font-semibold text-white text-right pr-5 pb-5 mb-5">
              Partners.❤️
            </h1>
          </div>
        </div>

        {/* Slide for AZVC */}
        <div className="w-96 scroll-item border border-black">
          <div className="px-5 pt-5">
            <a href="https://azvc.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/assets/partners/AZVC_Transparent.png"
                alt="AZVC Logo"
                className="h-32 mx-auto"
              />
            </a>
            <h2 className="text-center mt-5 text-xl font-semibold">AZVC</h2>
            <p className="text-center mt-1 mb-5">
              The largest venture capital fund in Arizona.
            </p>
          </div>
        </div>

        {/* Slide for Freeway */}
        <div className="w-96 scroll-item border border-black">
          <div className="px-5 pt-5">
            <a href="https://www.freewayphx.com/" target="_blank" rel="noopener noreferrer">
              <img
                src="/assets/partners/freeway_logo.jpeg"
                alt="Freeway Logo"
                className="h-32 mx-auto"
              />
            </a>
            <h2 className="text-center mt-5 text-xl font-semibold">Freeway</h2>
            <p className="text-center mt-1">
              Phoenix Startup Ecosystem.
            </p>
          </div>
        </div>

        {/* Slide for Venture Cafe Phoenix */}
        <div className="w-96 scroll-item border border-black">
          <div className="px-5 pt-5">
            <a href="https://venturecafephoenix.org/" target="_blank" rel="noopener noreferrer">
              <img
                src="/assets/partners/venture_cafe_phoenix.png"
                alt="Venture Cafe Phoenix Logo"
                className="h-32 mx-auto"
              />
            </a>
            <h2 className="text-center mt-5 text-xl font-semibold">
              Venture Cafe Phoenix
            </h2>
            <p className="text-center mt-1">
              Center for Entrepreneurship and Innovation, community events.
            </p>
          </div>
        </div>

        {/* Slide for Startup World Cup */}
        <div className="w-96 scroll-item border border-black">
          <div className="px-5 pt-5">
            <a href="https://www.startupworldcup.io/" target="_blank" rel="noopener noreferrer">
              <img
                src="/assets/partners/startup_world_cup.jpg"
                alt="Startup World Cup Logo"
                className="h-32 mx-auto"
              />
            </a>
            <h2 className="text-center mt-5 text-xl font-semibold">
              Startup World Cup
            </h2>
            <p className="text-center mt-1">
              Regional/National Pitch Competition.
            </p>
          </div>
        </div>

        {/* Slide for Chandler Endeavor */}
        <div className="w-96 scroll-item border border-black">
          <div className="px-5 pt-5">
            <a href="https://entrepreneurship.asu.edu/programs/chandler-endeavor-incubator/" target="_blank" rel="noopener noreferrer">
              <img
                src="/assets/partners/chandler_endeavor.jpeg"
                alt="Chandler Endeavor Logo"
                className="h-32 mx-auto"
              />
            </a>
            <h2 className="text-center mt-5 text-xl font-semibold">
              Chandler Endeavor
            </h2>
            <p className="text-center mt-1">
              J. Orin Edson Entrepreneurship + Innovation Institute Incubator.
            </p>
          </div>
        </div>

        {/* Slide for Global Career Network */}
        <div className="w-96 scroll-item border border-black border-r-2">
          <div className="px-5 pt-5">
            <a href="https://www.linkedin.com/company/global-career-network" target="_blank" rel="noopener noreferrer">
              <img
                src="/assets/partners/global_career_network.png"
                alt="Global Career Network Logo"
                className="h-32 mx-auto"
              />
            </a>
            <h2 className="text-center mt-5 text-xl font-semibold">
              Global Career Network
            </h2>
            <p className="text-center mt-1">
              The second largest student organization at ASU.
            </p>
          </div>
        </div>

        {/* Slide for SODA */}
        <div className="w-96 scroll-item border border-black">
          <div className="px-5 pt-5">
            <img
              src="/assets/partners/soda.jpeg"
              alt="SODA Logo"
              className="h-32 mx-auto"
            />
            <h2 className="text-center mt-5 text-xl font-semibold">SODA</h2>
            <p className="text-center mt-1">
              The largest software developer student organization at ASU.
            </p>
          </div>
        </div>

        {/* Slide for Startup Village */}
        <div className="w-96 scroll-item border border-black">
          <div className="px-5 pt-5">
            <img
              src="/assets/partners/startup_village.jpeg"
              alt="Startup Village Logo"
              className="mt-16 mx-auto"
            />
            <h2 className="text-center mt-5 text-xl font-semibold">Startup Village</h2>
          </div>
        </div>

        {/* Slide for Thunderbird AI Club */}
        <div className="w-96 scroll-item border border-black">
          <div className="px-5 pt-5 flex justify-center items-center h-40">
            <img
              src="/assets/partners/thunderbird_ai_club.png"
              alt="Thunderbird AI Club Logo"
              className="object-contain"
            />
          </div>
          <h2 className="text-center mt-5 text-xl font-semibold">Thunderbird AI Club</h2>
        </div>
      </div>
    </div>
  );
};

export default Partners;
