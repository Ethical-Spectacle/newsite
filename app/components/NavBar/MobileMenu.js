import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useLogged } from '@/context/store';
import Button from '../Button'
import Link from 'next/link'
import Image from 'next/image'
import esr from '@/assets/esr.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'


function MobileMenu({ toggleMobileMenu }) {
    const router = useRouter();
    const { logged, setLogged } = useLogged();
    const liClasses = 'text-2xl'
    const dividerClasses= 'flex h-[1px] w-full bg-rose-400 mt-3'
    const [userEmail, setUserEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Define isLoggedIn state
    const [isAdmin, setIsAdmin] = useState(false); // Define isAdmin state
    const [isEmailVerified, setIsEmailVerified] = useState(false); // Define isEmailVerified state

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("isEmailVerified");
        setUserEmail(null);
        setIsLoggedIn(false);
        setIsAdmin(false);
        setIsEmailVerified(false);
        setLogged(false);
        toggleMobileMenu();
        router && router.push('/join/login');
      };
    
      const handleLogin = () => {
        toggleMobileMenu();
        router && router.push('/join/login');
      }

  return (
    <div className="absolute top-0 left-0 w-screen h-screen z-10">
        <div className="bg-cream w-full h-full py-4 flex flex-col justify-between items-stretch">
            <div className='mx-2 h-20 p-2 flex items-center justify-between border border-slate-800'>
                <Link href="/" onClick={toggleMobileMenu}>
                    <Image src={esr} alt="Ethical Spectacle Research" width={70} height={70} />
                </Link>
                <div className='w-10 h-10 md:hidden flex items-center justify-center border border-slate-800' onClick={toggleMobileMenu}>
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
            <div className='bg-slate-800 mx-2 h-20 p-2 text-white flex items-center justify-between'>
                <Button title={logged ? 'Log out':'Log in'} clickFunction={logged ? handleLogout : handleLogin } />

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