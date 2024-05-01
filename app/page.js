'use client';
import React from 'react';
import Hero from './components/Home/Hero';
import PicsCarousel from './components/Home/PicsCarousel';
import BiasProjectCarousel from './components/Home/ResearchProjectBias';
import AgentsProjectCarousel from './components/Home/ResearchProjectAgents';
import Partners from './components/Home/Partners';

const Home = () => {
  return (
    <div>
      <Hero />
      <PicsCarousel />
      <BiasProjectCarousel />
      <AgentsProjectCarousel />
      <Partners />
    </div>
  );
};

export default Home;
