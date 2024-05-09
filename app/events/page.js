'use client';
import MiniEvents from '../account/components/MyAccount/MiniEvents';
import HthonPicsCarousel from './HthonPicsCarousel';
import OtherEventsPicsCarousel from './OtherEventsPicsCarousel';

export default function Events() {
  return (
    <div className="min-h-screen">
        <div className="px-5 pt-10 md:px-20 border border-black border-3 border-b-0">
            <h1 className="text-4xl font-bold text-black">Events 🎉</h1>
            <p className="mt-3 text-gray-500 text-md">A home for developers in Phoenix: Hackathons, workshops, hangouts, and lots of geeking-out.</p>
        </div>
    
        <div className="md:px-20 border border-black border-3 border-t-0">
            <MiniEvents/>
        </div>


        <div className="border border-black border-t-3">
            <h2 className="p-5 md:px-20 text-3xl font-bold text-gray-800 pt-7 pb-4">Past Events ⌛</h2>

            {/* hackathon */}
            <HthonPicsCarousel />

            {/* other */}
            <OtherEventsPicsCarousel />

        </div>


    </div>
  );
}