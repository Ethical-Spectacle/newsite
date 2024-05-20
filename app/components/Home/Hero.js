import React from "react";
import { PiHandSwipeLeftDuotone } from "react-icons/pi";
import { IoMdArrowForward } from "react-icons/io";

const Hero = () => {
  return (
    <div className="bg-white sm:bg-black">
      <div className="scroll-container hide-scrollbar">
        <div className="h-72 w-full scroll-item md:px-20">
          <h1 className="inline-block border-black border-4 p-3 py-2 m-2 ml-10 mt-6 text-5xl whitespace-nowrap md:ml-20 md:mt-10 sm:text-pink-300 sm:border-white text-pink-300">
            Ethical Spectacle Research ;)
          </h1>
          <p className="text-black text-2xl p-5 pb-0 m-2 mt-5 leading-snug md:ml-10 sm:text-white">
            Developers that write *clean* code.
          </p>
          <h2 className="flex flex-row justify-end pr-5 text-xl md:hidden hidden">
            <PiHandSwipeLeftDuotone className="mt-1 text-5xl" />
            Swipe
          </h2>
          <h2 className="flex flex-row justify-end pt-5 pr-5 mr-10 text-xl md:flex">
            <PiHandSwipeLeftDuotone className="mt-1 text-5xl" />
            Scroll
          </h2>
        </div>
        <div className="h-72 w-full md:w-1/2 scroll-item flex flex-col justify-end p-3 py-2">
          <p className="text-2xl font-semibold mb-2 sm:text-white">Research.</p>
          <p className="mb-5 sm:text-white">
            We do AI/ML research in nuanced contexts, publishing research papers
            and open source tools for developers.
          </p>
        </div>
        <div className="h-72 w-full md:w-1/2 scroll-item flex flex-col justify-end pl-5 p-3 py-2 md:px-20">
          {/* can someone add something here, fill the space, top right aligned */}
          <p className="text-2xl font-semibold mb-2 mt-2 sm:text-white">
            Community.
          </p>
          <p className="mb-2 sm:text-white">
            We run events for the developers and entrepreneurs of Phoenix.
          </p>
          <p className="mb-5 sm:text-white">
            Climb our leaderboard by attending events, winning hackathons,
            taking leadership roles, etc.
          </p>
        </div>
        <a
          href="/account"
          className="h-72 w-full md:w-1/2 scroll-item p-3 py-2 bg-black flex"
        >
          <h1 className="text-5xl font-semibold mb-2 mt-2 text-white flex-col justify-end md:ml-5">
            Become a Member.
          </h1>
          <div className="flex flex-col justify-end text-white text-8xl md:ml-32">
            <IoMdArrowForward />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Hero;
