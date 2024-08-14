"use client";
import React from "react";
import Hero from "./components/Home/Hero";
import PicsCarousel from "./components/Home/PicsCarousel";
import BiasProjectCarousel from "./components/Home/ResearchProjectBias";
import AgentsProjectCarousel from "./components/Home/ResearchProjectAgents";
import Partners from "./components/Home/Partners";
import NewHero from "./components/Home/NewHero";

const Home = () => {
  return (
    <>
      {/* <NewHero /> */}
      <Hero />
      <PicsCarousel />
      <BiasProjectCarousel />
      <AgentsProjectCarousel />
      <Partners />
    </>
  );
};

export default Home;
