'use client'
import React, { useState } from 'react';
import whitelogo from '../../assets/whitelogo.svg'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../Button'
import MobileMenu from './MobileMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function NavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const hoverClasses = 'text-slate-50 hover:font-semibold hover:underline hover:decoration-rose-400 hover:underline-offset-4'

  return (
    <nav className='w-full fixed justify-center bg-slate-800 drop-shadow-md'>
      <div className='max-w-1440 p-2 flex md:flex-row justify-between mx-auto'>
        <Link href="/">
          <Image src={whitelogo} alt="Ethical Spectacle Research" width={70} height={70} />
        </Link>
        <ul className='space-x-4 hidden md:flex text-black space-x-7'>
          <li className={hoverClasses}>
            <Link href="/about"> Events </Link>
          </li>
          <li className={hoverClasses}>
            <Link href="/contact"> About </Link>
          </li>
          <li className={hoverClasses}>
            <Link href="/contact"> Leaderboard </Link>
          </li>
        </ul>
        <Button title='Log in' additionalClass='hidden'/>
        <div className='w-7 h-7 text-slate-50 md:hidden' onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faBars} className='w-full h-full' />
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