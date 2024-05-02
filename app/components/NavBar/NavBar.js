'use client';

import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaMeetup, FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black">
      <div className="w-full">
        <div className="flex justify-between items-center py-6">

          {/* Logo */}
          <Link href="/" className="ml-5">
              <img src="/assets/light_logo_no_bg.png" alt="Logo" className="h-10"/>
          </Link>

          {/* Primary Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/about" className="py-5 px-3 text-white hover:text-pink-300">About</Link>
            <Link href="/leaderboard" className="py-5 px-3 text-white hover:text-pink-300">Leaderboard</Link>
            <Link href="/events" className="py-5 px-3 text-white hover:text-pink-300">Events</Link>
            <Link href="/join" className="py-5 px-3 text-white hover:text-pink-300">Join</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <Link href="/account" className="bg-white py-1 px-3 mr-5 rounded text-black hover:bg-pink-300">Join :P</Link>
            <button onClick={() => setIsOpen(!isOpen)} className="mr-5">
              {isOpen ? <AiOutlineClose className="h-8 w-8 text-black" /> : <AiOutlineMenu className="h-8 w-8 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-3/4 bg-white" onClick={(e) => e.stopPropagation()}>
            {/* Navigation Links */}
            <Link href="/" onClick={() => setIsOpen(false)}><h1 className="p-4 text-xl border-b border-gray-300">Home</h1></Link>
            <Link href="/hackathons" onClick={() => setIsOpen(false)}><h1 className="p-4 text-xl border-b border-gray-300">Hackathons</h1></Link>
            <Link href="/about" onClick={() => setIsOpen(false)}><h1 className="p-4 text-xl border-b border-gray-300">About Us</h1></Link>
            <Link href="/account" onClick={() => setIsOpen(false)}><h1 className="p-4 text-xl border-b border-gray-300">Profile</h1></Link>
            <Link href="/leaderboard" onClick={() => setIsOpen(false)}><h1 className="p-4 text-xl border-b border-gray-300">Leaderboard</h1></Link>

            {/* Social Links */}
            <div className='flex justify-evenly items-center mt-4 pb-4'>
              <a href="https://github.com/Ethical-Spectacle" className="text-black text-3xl"><FaGithub /></a>
              <a href="https://www.meetup.com/ethical-spectacle-research/events/" className="text-black text-3xl"><FaMeetup /></a>
              <a href="https://www.linkedin.com/company/ethical-spectacle-research" className="text-black text-3xl"><FaLinkedinIn /></a>
              <a href="https://www.instagram.com/ethical_spectacle/" className="text-black text-3xl"><FaInstagram /></a>
              <a href="https://huggingface.co/ethical-spectacle" target="_blank" rel="noopener noreferrer" className="text-black">
                <img src='/assets/huggingface.svg' alt="Hugging Face" className="h-7" />
              </a>
            </div>
          </div>
        </div>

      )}
    </nav>
  );
};

export default Navbar;
