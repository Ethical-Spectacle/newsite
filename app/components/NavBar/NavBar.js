'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLogged } from '@/context/store';
import blacklogo from '../../assets/blacklogo.svg'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../Button'
import MobileMenu from './MobileMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
  const { logged, setLogged } = useLogged();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [buttonText, setButtonText] = useState('Log in');
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Define isLoggedIn state
  const [isAdmin, setIsAdmin] = useState(false); // Define isAdmin state
  const [isEmailVerified, setIsEmailVerified] = useState(false); // Define isEmailVerified state
  const router = useRouter();

  useEffect(() => {
    const isLoggedInValue = localStorage.getItem("isLoggedIn");
    if (isLoggedInValue !== "false") {
      setButtonText('Log out');
      setLogged(true);
    }
    else {
      setButtonText('Log in');
      setLogged(false);
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
    setLogged(false);
    router && router.push('/join/login');
  };

  const handleLogin = () => {
    router && router.push('/join/login');
  }

  const hoverClasses = 'hover:font-semibold hover:underline hover:decoration-rose-400 hover:underline-offset-4'

  return (
    <nav className='outside-container border-b border-black'>
      <div className='boxed-container h-[100px] px-5 items-center justify-between'>
        <Link href="/" className='w-1/3' >
          <Image src={blacklogo} alt="Ethical Spectacle Research" width={70} height={70} />
        </Link>

        <ul className='space-x-4 hidden w-1/3 md:flex space-x-7'>
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

        <div className='border-l border-black h-full w-2/3 md:w-1/4 flex items-center justify-end'>
          {logged ? (
                  <Link href='/account' className='text-lg px-5 underline underline-offset-4' >
                    Account
                  </Link>
            ) : null}
          <Button title={logged ? 'Log out':'Log in'} clickFunction={logged ? handleLogout : handleLogin } />
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

export default NavBar;
