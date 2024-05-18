'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useAuth } from '../context/AuthContext'; 
import { FaMeetup, FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth(); 

  const handleLogoutNav = () => {
    logout();
    window.location.href = '/';
  };

  // need to figure out different solution
  // const isActive = (path) => {
  //   return window.location.pathname === path ? "text-white border-b-2 border-pink-300" : "text-white";
  // };

  return (
    <nav className="bg-black">
      <div className="w-full">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link href="/" className="ml-5 md:ml-10">
            <img src="/assets/light_logo_no_bg.png" alt="Logo" className="h-10"/>
          </Link>

          {/* Primary Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-10 mr-10 text-white">
            <a href="/" className="text-xl">Home</a>
            <a href="/leaderboard" className="text-xl">Leaderboard</a>
            <a href="/events" className="text-xl">Events</a>
            <a href="/account" className="text-xl">Profile</a>
            {/* <a href="/about" className="text-xl">About Us</a> */}
            {isLoggedIn ? (
              <button onClick={handleLogoutNav} className="bg-white py-1 px-3 mr-5 rounded text-black hover:bg-pink-300">Sign Out</button>
            ) : (
              <Link href="/account" className="bg-white py-1 px-3 mr-5 rounded text-black hover:bg-pink-300">Join :P</Link>
            )}
          </div>
          {/* primary nav with active underline, cant get it to build but it works in dev */}
          {/* <div className="hidden md:flex items-center space-x-5 mr-10">
            <a href="/" className={`${isActive('/')} text-xl`}>Home</a>
            <a href="/leaderboard" className={`${isActive('/leaderboard')} text-xl`}>Leaderboard</a>
            <a href="/events" className={`${isActive('/events')} text-xl`}>Events</a>
            <a href="/about" className={`${isActive('/about')} text-xl`}>About Us</a>
            <a href="/account" className={`${isActive('/account')} text-xl`}>Profile</a>
          </div> */}

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            {isLoggedIn ? (
              <button onClick={handleLogoutNav} className="bg-white py-1 px-3 mr-5 rounded text-black hover:bg-pink-300">Sign Out</button>
            ) : (
              <Link href="/account" className="bg-white py-1 px-3 mr-5 rounded text-black hover:bg-pink-300">Join :P</Link>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="mr-5" style={{ zIndex: 550 }}>
              {isOpen ? <AiOutlineClose className="h-8 w-8 text-black" /> : <AiOutlineMenu className="h-8 w-8 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50" style={{ zIndex: 500 }} onClick={() => setIsOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-3/4 bg-white flex flex-col z-50" onClick={(e) => e.stopPropagation()}>
            <h1 className="text-4xl font-semibold p-4 h-18 mt-3 mb-1">Menu</h1>

            {/* Navigation Links */}
            <a href="/" onClick={() => setIsOpen(false)} className="p-4 text-xl border border-gray-300">Home 🏠</a>
            <a href="/leaderboard" onClick={() => setIsOpen(false)} className="p-4 text-xl border-b border-gray-300">Leaderboard 🏆</a>
            <a href="/events" onClick={() => setIsOpen(false)} className="p-4 text-xl border-b border-gray-300">Events ☕</a>
            {/* <a href="/research" onClick={() => setIsOpen(false)} className="p-4 text-xl border-b border-gray-300">Research 🔬</a> */}
            {/* <a href="/about" onClick={() => setIsOpen(false)} className="p-4 text-xl border-b border-gray-300">About Us 🆒</a> */}
            <a href="/account" onClick={() => setIsOpen(false)} className="p-4 text-xl border-b border-gray-300">Profile 👾</a>

            {/* Social */}
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
