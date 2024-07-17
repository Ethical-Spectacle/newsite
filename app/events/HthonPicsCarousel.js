'use client';
import React from 'react';
import Image from 'next/image';

const HthonPicsCarousel = () => {
    const hthon_images = [
        '/HomePagePics/EventsPagePics/Hackathon/team-aziz.png',
        '/HomePagePics/EventsPagePics/Hackathon/team-4.jpeg',
        '/HomePagePics/EventsPagePics/Hackathon/industrious-main-space-2.png',
        '/HomePagePics/EventsPagePics/Hackathon/team-5.jpeg',
        '/HomePagePics/EventsPagePics/Hackathon/a-mountain.png',
        '/HomePagePics/EventsPagePics/Hackathon/team-2.jpeg',
        '/HomePagePics/EventsPagePics/Hackathon/team-8.jpeg',
        '/HomePagePics/EventsPagePics/Hackathon/team-7.jpeg',
        '/HomePagePics/EventsPagePics/Hackathon/team-3.jpeg',
    ];

    const pitch_images = [
        '/HomePagePics/EventsPagePics/Hackathon/judge-ashok.png',
        '/HomePagePics/EventsPagePics/Hackathon/full-pitch-comp.jpeg',
        '/HomePagePics/EventsPagePics/Hackathon/alex.jpeg',
        '/HomePagePics/EventsPagePics/Hackathon/check.png',
        '/HomePagePics/EventsPagePics/Hackathon/judge-mary.jpeg',
        '/HomePagePics/EventsPagePics/Hackathon/1712629454109.jpeg',
        '/HomePagePics/EventsPagePics/Hackathon/judges-and-core-team.jpeg',
        '/HomePagePics/EventsPagePics/Hackathon/core-team.jpeg',
    ];

    return (
        <div className="py-3">
            {/* <h2 className="px-5 md:px-20 text-2xl font-bold text-gray-800">"It's The Sustainability For Me"</h2>
            <p className="px-5 md:px-20 md:ml-5 md:mt-2 text-gray-500 text-md">Hackathon and Pitch Competition</p>
            <p className="px-5 md:px-20 md:ml-5 text-gray-500 text-md mb-6">April 5-7, 2023</p> */}


            {/* carousels  */}
            <div className="flex overflow-x-scroll hide-scrollbar">
                {/* hackathon images */}
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
            <div className="flex overflow-x-scroll hide-scrollbar">
                {/* pitch comp images */}
                {pitch_images.map((src, index) => (
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

export default HthonPicsCarousel;
