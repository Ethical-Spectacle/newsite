'use client';
import MiniEvents from '../account/components/MyAccount/MiniEvents';

export default function Events() {
  return (
    <div className="min-h-screen">
        <div className="px-5 py-10 md:px-20 border border-black border-3">
            <h1 className="text-4xl font-bold text-black">Events 🎉</h1>
            <p className="mt-3 text-gray-500 text-md">A home for developers in Phoenix: Hackathons, workshops, hangouts, and lots of geeking-out.</p>
        </div>
    
        <MiniEvents />

        <div className="p-5 md:px-20 border border-black border-3">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Past Events</h2>

            {/* hackathon */}

            {/* research recap */}

            {/* recruitment */}

        </div>


    </div>
  );
}