'use client';
import React from 'react';
import Image from 'next/image';

const OtherEventsPicsCarousel = () => {
    const hthon_images = [
        '/HomePagePics/EventsPagePics/Other/full-group-2.png',
        '/HomePagePics/EventsPagePics/Other/company-cookout.png',
        '/HomePagePics/EventsPagePics/Other/research-recap.png',
        '/HomePagePics/EventsPagePics/Other/ai-panel-max.png',
        '/HomePagePics/EventsPagePics/Other/ai-panel-alex-happy-friends.jpeg',
        '/HomePagePics/EventsPagePics/Other/full-group.png',
        '/HomePagePics/EventsPagePics/Other/recruitment-outside.jpeg',
        '/HomePagePics/EventsPagePics/Other/gcn-summit.png',
        '/HomePagePics/EventsPagePics/Other/african-business-club.png',
        '/HomePagePics/EventsPagePics/Other/ai-pitch-event.png',
        '/HomePagePics/EventsPagePics/Other/ai-workshop.png',
        '/HomePagePics/EventsPagePics/Other/money-callin.png',
    ];

    return (
        <div className="pt-3">
            <h2 className="px-5 md:px-20 text-2xl font-bold text-gray-800 mb-5 mt-5">Other Sightings</h2>

            {/* carousel  */}
            <div className="flex overflow-x-scroll hide-scrollbar">
                {/* folder images */}
                {hthon_images.map((src, index) => (
                    <div key={index} className="shrink-0 first:pl-0 last:pr-0">
                        <Image 
                            src={src} 
                            alt={`Slide ${index}`}
                            width={300}
                            height={300}
                            className="object-cover h-64 md:h-80 w-full"
                        />
                    </div>
                ))}
            </div>

        </div>
    );
};

export default OtherEventsPicsCarousel;
