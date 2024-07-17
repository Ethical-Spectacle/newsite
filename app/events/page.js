'use client';
import MiniEvents from './MiniEvents';
import Hackathons from './Hackathons';
import HthonPicsCarousel from './HthonPicsCarousel';
import OtherEventsPicsCarousel from './OtherEventsPicsCarousel';

export default function Events() {
  return (
    <div className="min-h-screen">
        <div className="px-5 pt-10 pb-5 md:px-20">
            <h1 className="text-4xl font-bold text-black">Upcoming Events</h1>
            <p className="mt-3 text-gray-500 text-md">A home for developers in Phoenix: Hackathons, workshops, hangouts, and lots of geeking-out.</p>
        </div>

        <div className="md:px-20">
            <Hackathons/>
        </div>
    
        <div className="md:px-20">
            <MiniEvents/>
        </div>


        <div className="">
            <h2 className="p-5 md:px-20 text-3xl font-bold text-gray-800 pt-7 pb-4">Past Events ⌛</h2>

            {/* hackathon */}
            <HthonPicsCarousel />

            {/* other */}
            <OtherEventsPicsCarousel />

        </div>


    </div>
  );
}