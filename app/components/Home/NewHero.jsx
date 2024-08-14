"use client";
import { Boxes } from "../ui/background-boxes";
import { cn } from "../../../lib/utils";
import { FaAnglesDown } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

function NewHero() {
  return (
    <main className="h-screen relative w-full overflow-hidden bg-black flex flex-col items-center justify-center">
      <section className="absolute inset-0 w-full h-full bg-black z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <button
        type="button"
        className="p-2 bg-transparent border-pink-300 z-20 mb-4 rounded-full flex"
      >
        <a href="/leaderboard" className=" items-center flex">
          <p className="text-pink-300">🎯 | Check out our leaderboards</p>
          <IoIosArrowForward className="text-pink-300" />
        </a>
      </button>
      <h1
        className={cn(
          "md:text-7xl text-6xl text-white relative z-20 font-semibold max-lg:px-10"
        )}
      >
        Ethical Spectacle Research
      </h1>
      <p className="max-lg:text-left text-center mt-2 text-neutral-300 relative z-20 mx-auto px-40 max-lg:px-10">
        We are an Arizona-based non-profit dedicated to software development,
        community building, and the publication of ethical technology and social
        research. Our judging panel featured four esteemed professionals,
        including university professors, global ethical leaders, and venture
        capitalists.
      </p>

      {/* <div className="flex gap-10 my-10">
        <a
          href="/leaderboard"
          type="button"
          className="inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none bg-white shadow  h-10 px-8 whitespace-pre md:flex group relative w-full gap-1 rounded-xl text-sm font-semibold tracking-tighter ring-offset-inherit transition-all duration-150 ease-in-out hover:ring-2 hover:ring-black hover:ring-offset-2 hover:ring-offset-current dark:hover:ring-neutral-50"
        >
          <p className="text-black">Sign Up</p>
          <IoIosArrowForward className="text-black" />
        </a>
        <a
          href="/leaderboard"
          type="button"
          className="inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none bg-white shadow  h-10 px-8 whitespace-pre md:flex group relative w-full gap-1 rounded-xl text-sm font-semibold tracking-tighter ring-offset-inherit transition-all duration-150 ease-in-out hover:ring-2 hover:ring-black hover:ring-offset-2 hover:ring-offset-current dark:hover:ring-neutral-50"
        >
          <p className="text-black">Research Projects</p>
          <IoIosArrowForward className="text-black" />
        </a>
      </div> */}

      <svg class="animate-bounce w-6 h-6  absolute bottom-0 mb-20">
        <FaAnglesDown className="text-white text-2xl" />
      </svg>
    </main>
  );
}

export default NewHero;
