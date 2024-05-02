import Button from '../Button'
import Link from 'next/link'
import Image from 'next/image'
import whitelogo from '../../assets/whitelogo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'


function MobileMenu({ isOpen, toggleMobileMenu }) {
    const liClasses = 'text-2xl'
    const dividerClasses= 'flex h-[1px] w-full bg-rose-400 mt-3'

    if (!isOpen) return null; // hide the menu when isOpen is false.

  return (
    <div className="absolute top-0 left-0 w-screen h-screen z-10">
        <div className="bg-slate-50 w-full h-full py-4 flex flex-col justify-between items-stretch">
            <div className='bg-slate-800 mx-2 h-20 p-2 rounded-lg text-white flex items-center justify-between'>
                <Link href="/" onClick={toggleMobileMenu}>
                    <Image src={whitelogo} alt="Ethical Spectacle Research" width={70} height={70} />
                </Link>
                <div className='w-10 h-10 md:hidden bg-slate-50 flex items-center justify-center rounded-lg' onClick={toggleMobileMenu}>
                    <FontAwesomeIcon icon={faXmark} className='w-6 h-6 black-svg' />
                </div>
            </div>
            <ul className="h-1/3 p-2 flex flex-col justify-around text-black">
                <li className={liClasses}>
                    <Link href="/about" onClick={toggleMobileMenu}>Events</Link>
                    <span className={dividerClasses} />
                </li>
                <li className={liClasses}>
                    <Link href="/contact" onClick={toggleMobileMenu}>About</Link>
                    <span className={dividerClasses} />
                </li>
                <li className={liClasses}>
                    <Link href="/contact" onClick={toggleMobileMenu}>Leaderboard</Link>
                    <span className={dividerClasses} />
                </li>
            </ul>
            <div className='bg-slate-800 mx-2 h-20 p-2 rounded-lg text-white flex items-center justify-between'>
                <Button title='Log in' href='/join/login' clickFunction={toggleMobileMenu} />

                <div className='space-x-2'>
                    <FontAwesomeIcon icon={faGithub} className='w-10 h-10' />
                    <FontAwesomeIcon icon={faLinkedin} className='w-10 h-10' />
                    <FontAwesomeIcon icon={faInstagram} className='w-10 h-10' />
                </div>
            </div>
        </div>
  </div>
  )
}

export default MobileMenu