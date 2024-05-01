import React from 'react';

const PicsCarousel = () => {
    // need to add some of research recaps and from pitch comp
    // make this auto scroll later
    const images = [
        '/HomePagePics/pitch-comp.jpeg',
        '/HomePagePics/pitch-comp-tean.jpeg',
        '/HomePagePics/pitch-comp-judges.jpeg',
        // '/HomePagePics/sustainability-hthon-winners.png',
        '/HomePagePics/hthon-kickoff.jpg',
        '/HomePagePics/happy-alex.jpeg',
        '/HomePagePics/african-business-club.jpeg',
        '/HomePagePics/bbq-2.jpeg',
        '/HomePagePics/recruitment-whole-group.jpeg',
        '/HomePagePics/core-team-hthon.jpeg',
        '/HomePagePics/hthon-team.jpeg',
        '/HomePagePics/hthon-team-2.jpeg',
        '/HomePagePics/hthon-team-3.jpeg',
        '/HomePagePics/recruitment-group-2.jpeg',
        '/HomePagePics/gcn-pres.jpeg',
        '/HomePagePics/team-walk.jpeg',
        '/HomePagePics/tonys-byard.jpeg',
        '/HomePagePics/faichal-candid.jpeg',
        '/HomePagePics/happy-max-alex.jpeg',
        '/HomePagePics/hthon-prep.jpeg',
        '/HomePagePics/director.jpeg',
        '/HomePagePics/how-many-engineers-does-it-take.jpg',
        '/HomePagePics/naidoo-pres.png',
    ];


  return (
    <div className="flex overflow-x-scroll">
      {images.map((src, index) => (
        <div key={index} className="h-72 shrink-0 first:pl-0 last:pr-0">
          <img 
            className="w-full h-full object-cover" 
            src={src} 
            alt={`Slide ${index}`}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default PicsCarousel;
