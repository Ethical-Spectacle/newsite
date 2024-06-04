import React from "react";
import { PiHandSwipeLeftDuotone } from "react-icons/pi";
import { IoMdArrowForward } from "react-icons/io";

const Partners = () => {
  return (
    <div className="bg-white">
      <div className="scroll-container hide-scrollbar flex flex-row justify-start">
        {/* Title slide */}
        <div className="w-full pl-48 bg-black">
          <div className="flex flex-col h-full justify-end">
            <h1 className="mt-5 text-5xl font-semibold text-white text-right pr-5 pb-5 mb-5">
              Partners.❤️
            </h1>
            <h2 className="flex flex-row justify-end pr-5 mr-10 text-xl md:flex ">
              <PiHandSwipeLeftDuotone className="my-3 text-5xl text-white sm:hidden" />
              Scroll
            </h2>
          </div>
        </div>

        {comapnyPartners.map((partner) => (
          <div
            key={partner.name}
            className="scroll-item border border-black p-3"
          >
            <div className="px-5 pt-5">
              <img
                src={partner.imageSource}
                alt={partner.alt}
                className="h-32 mx-auto"
              />
              <h2 className="text-center mt-5 text-xl font-semibold">
                {partner.name}
              </h2>
              <p className="text-center mt-1">{partner.description}</p>
            </div>
          </div>
        ))}

        <div className="w-full bg-black flex flex-row justify-between items-center p-5">
          <h1 className="text-4xl font-semibold text-white">
            Partner with Us.
          </h1>
          <a href="/account" className="flex items-center">
            <IoMdArrowForward className="text-white text-8xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Partners;

const comapnyPartners = [
  {
    name: "AZVC",
    description: "The largest venture capital fund in Arizona.",
    imageSource: "/assets/AZVC_Transparent.png",
    alt: "AZVC Logo",
  },
  {
    name: "Global Career Network",
    description: "The second largest student organization at ASU.",
    imageSource: "/assets/global_career_network.png",
    alt: "Global Career Network Logo",
  },
];
