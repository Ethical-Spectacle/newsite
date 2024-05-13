import React from 'react';
import { PiHandSwipeLeftDuotone } from "react-icons/pi";

const Partners = () => {
  return (
    <div className="bg-white">
      <div className="scroll-container hide-scrollbar flex justify-center">

        {/* Title slide */}
        <div className="w-96 scroll-item bg-black">
          <div className="flex flex-col h-full justify-end">
            <h1 className="flex flex-rown mt-5 pb-5 text-5xl font-semibold text-white justify-end pr-5 pb-10">Partners.❤️ <PiHandSwipeLeftDuotone className="ml-3 md:hidden"/></h1>
          </div>
        </div>

        {/* Slide for AZVC */}
        <div className="w-96 scroll-item border border-black">
          <div className="px-5 pt-5">
            <img src="/assets/AZVC_Transparent.png" alt="AZVC Logo" className="h-32 mx-auto" />
            <h2 className="text-center mt-5 text-xl font-semibold">AZVC</h2>
            <p className="text-center mt-1">The largest venture capital fund in Arizona.</p>
          </div>
        </div>

        {/* Slide for Global Career Network */}
        <div className="w-96 scroll-item border border-black border-r-2">
          <div className="p-5">
            <img src="/assets/global_career_network.png" alt="Global Career Network Logo" className="h-32 mx-auto" />
            <h2 className="text-center mt-5 text-xl font-semibold">Global Career Network</h2>
            <p className="text-center mt-1">The second largest student organization at ASU.</p>
            <h2 className="flex flex-row justify-end pr-5 text-xl">
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Partners;
