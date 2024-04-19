import React from 'react'
import Link from 'next/link'

function MobileMenu() {
    const hoverClasses = 'hover:font-semibold hover:underline hover:decoration-rose-400 hover:underline-offset-4'

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black/50 z-10">
        <div className="bg-white w-full h-full pt-4">
            <div className='bg-slate-800 mx-2 h-14 p-2 rounded-lg text-white'>
                <p>Hello</p>
            </div>
            <ul className="space-y-4 p-4 text-black">
                <li className={hoverClasses}>
                <Link href="/about">Events</Link>
                </li>
                <li className={hoverClasses}>
                <Link href="/contact">About</Link>
                </li>
                <li className={hoverClasses}>
                <Link href="/contact">Leaderboard</Link>
                </li>
            </ul>
        </div>
  </div>
  )
}

export default MobileMenu