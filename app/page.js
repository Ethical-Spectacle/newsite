"use client";
import React from "react";
import Hero from "./components/Home/Hero";
import PicsCarousel from "./components/Home/PicsCarousel";
import BiasProjectCarousel from "./components/Home/ResearchProjectBias";
import AgentsProjectCarousel from "./components/Home/ResearchProjectAgents";
import Partners from "./components/Home/Partners";
import LeaderBoardCheckOut from "./components/Home/LeaderBoardCheckOut";
import BlackHorizontalLine from "./components/Home/BlackHorizontalLine";

const Home = () => {
  return (
    <div>
      <Hero />
      <LeaderBoardCheckOut />
      <PicsCarousel />
      <BlackHorizontalLine />
      <BiasProjectCarousel />
      <AgentsProjectCarousel />
      <Partners />
    </div>
  );
};

export default Home;
