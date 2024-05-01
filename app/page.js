'use client';
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { MdArrowForward } from "react-icons/md";
import { PiHandSwipeLeftDuotone } from "react-icons/pi";

const Home = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 60000,
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="h-16 spacer"></div>
      {/* Top Carousel with Mission Statement and Join Now */}
      <div className="scroll-container">
        <div className="size-72 scroll-item">
          <h1 className="inline-block border border-black border-4 p-3 m-2 ml-10 mt-6 text-5xl whitespace-nowrap">Ethical Spectacle Research ;)</h1>
          <p className="text-black text-2xl p-5 pb-0 m-2 mt-5 leading-snug">Developers that write *clean* code.</p>
          <h2 className="flex flex-row justify-end pr-5 text-xl"><PiHandSwipeLeftDuotone className="mt-1 text-5xl"/> Swipe</h2>
        </div>
        <div className="size-72 scroll-item flex flex-col justify-end p-3">
          <p className="text-2xl font-semibold mb-2">Research.</p>
          <p className="mb-5">We publish papers and build open source tools that make it easier for developers to uphold ethics in the AI era.</p>
        </div>
        <div className="size-72 scroll-item flex flex-col justify-end p-3">
          {/* can someone add something here, fill the space, top right aligned */}
          <p className="text-2xl font-semibold mb-2 mt-2">Community.</p>
          <p className="mb-5">Our devs get first access to our research, career opportunities, and invite-only events.</p>
        </div>
        <a href="/account" className="size-72 scroll-item p-3 bg-black flex">
          <h1 className="text-5xl font-semibold mb-2 mt-2 text-white flex-col justify-start">Become a Member.</h1>
          <div className="flex flex-col justify-end text-white text-8xl"><MdArrowForward/></div>
        </a>
      </div>

      {/* Developer Leaderboard Banner */}
      <div className="text-center py-4 uppercase tracking-wide font-bold text-lg border-t-2 border-b-2">
        Developer Leaderboard
      </div>

      {/* Pictures Carousel */}
      <Slider {...settings}>
        <div className="h-64 flex justify-center items-center">
          <img src="/path-to-your-image1.jpg" alt="Event Image" className="max-w-full h-auto" />
        </div>
        <div className="h-64 flex justify-center items-center">
          <img src="/path-to-your-image2.jpg" alt="Event Image" className="max-w-full h-auto" />
        </div>
      </Slider>
    </div>
  );
};

export default Home;
