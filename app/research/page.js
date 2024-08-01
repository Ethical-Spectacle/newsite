'use client';

import React, { useEffect, useState } from 'react';
import ResearchProjects from './ResearchProjects';

const ResearchPage = () => {

    return (
        <div className="flex justify-center">

            <div className="p-3 pb-6 md:mx-20 max-w-3xl">
                <ResearchProjects />
                <div className="m-5 mt-0">
                    <div className="">
                        <h1 className="text-2xl">Research Mission</h1>
                        <p className="text-lg text-gray-700 mt-2">
                            Open-minded and open-source. We build technical contributions in the (distinct) fields of ethics, tech-ethics, and humanities. Then we publish papers about our AI models and software architectures in recognized computer science journals. None of that corporate nonsense, just friends driven by passion and curiosity.
                        </p>

                        <h1 className="text-2xl mt-6">Transparency</h1>
                        <p className="text-lg text-gray-700 mt-2">
                            Everything about us, from our research to this website is open-source, distributed, and transparent. We do this intentionally, to include diverse fields and expertise in our research process.
                        </p>
        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResearchPage;