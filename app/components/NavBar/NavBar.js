'use client'
import React, { useState, useEffect } from 'react';
import whitelogo from '../../assets/whitelogo.svg'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../Button'
import MobileMenu from './MobileMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { redirect } from 'next/navigation';

function NavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [buttonText, setButtonText] = useState('Log in');
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Define isLoggedIn state
  const [isAdmin, setIsAdmin] = useState(false); // Define isAdmin state
  const [isEmailVerified, setIsEmailVerified] = useState(false); // Define isEmailVerified state

  useEffect(() => {
    const isLoggedInValue = localStorage.getItem("isLoggedIn");
    if (isLoggedInValue !== "false") {
      setButtonText('Log out');
    }
  }, []);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isEmailVerified");
    setUserEmail(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsEmailVerified(false);
    redirect('/join/login');
  };

  const hoverClasses = 'text-slate-50 hover:font-semibold hover:underline hover:decoration-rose-400 hover:underline-offset-4'

  return (
    <nav className='w-full fixed justify-center bg-slate-800 drop-shadow-md z-20'>
      <div className='max-w-1440 p-2 flex md:flex-row justify-between mx-auto'>
        <Link href="/">
          <Image src={whitelogo} alt="Ethical Spectacle Research" width={70} height={70} />
        </Link>
        <ul className='space-x-4 hidden md:flex text-black space-x-7'>
          <li className={hoverClasses}>
            <Link href="/"> Events </Link>
          </li>
          <li className={hoverClasses}>
            <Link href="/"> About </Link>
          </li>
          <li className={hoverClasses}>
            <Link href="/"> Leaderboard </Link>
          </li>
        </ul>
        <div className='flex space-x-4 justify-center items-center'>
          <Button title={buttonText} clickFunction={buttonText === 'Log out' ? handleLogout:null } href='/join/login' />
          <div className='w-7 h-7 text-slate-50 md:hidden' onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} className='w-full h-full' />
          </div>
        </div>

      </div>
      {showMobileMenu && (
        <MobileMenu 
          toggleMobileMenu={toggleMobileMenu}
        />  
      )}
    </nav>
  )
}

export default NavBar