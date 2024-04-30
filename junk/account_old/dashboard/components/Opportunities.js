import React from 'react';

function Opportunities() {
  return (
    <div className="flex relative">
        <div className='absolute top-28 -left-16 -rotate-90 md:-left-28 md:top-32'>
          <h2>Opportunities</h2>
        </div>

        <section className='flex flex-col w-fit'>

            <div className='h-full border-l border-slate-800 ml-8 px-4 pt-12 pb-2 space-y-4'>
                <p>
                    Get involved and join our organization's leadership
                </p>
                <div className="bg-white px-2 py-4 border border-slate-800 -mr-4">
                    <div className="event-info flex flex-col">
                        <span className="text-xl bg-pink-200 rounded-full p-2 border border-slate-800 w-fit min-w-[225px]">
                        Apply as researcher
                        </span>
                        <span className="event-date text-lg">Join a research project or start one of your own</span>
                    </div>
                    <div className="event-description text-xl mt-4">
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLScSCOT3qqiel1Pf4ejg8nESlWMi4rajNwS-9xtC7fGTDwG0Gw/viewform" target="_blank" rel="noopener noreferrer" className='underline decoration-cpink decoration-4 underline-offset-4'>
                            Apply →
                        </a>
                    </div>
                </div>
            </div>

            <div className='h-full border-l border-slate-800 ml-8 px-4 py-2 space-y-4'>
                <div className="bg-white px-2 py-4 border border-slate-800 -mr-4">
                    <div className="event-info flex flex-col">
                        <span className="text-xl bg-pink-200 rounded-full p-2 border border-slate-800 w-fit min-w-[225px]">
                        Write for our blog
                        </span>
                        <span className="event-date text-lg">Contribute to our community's knowledge base</span>
                    </div>
                    <div className="event-description text-xl mt-4">
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdRVO8jWOb8bF6ZDlL2ZtXl8eupC37fRA-vCZmhM9CI36p_Rg/viewform" target="_blank" rel="noopener noreferrer" className='underline decoration-cpink decoration-4 underline-offset-4'>
                            Apply →
                        </a>
                    </div>
                </div>
            </div>

            <div className='h-full border-l border-slate-800 ml-8 px-4 py-2 space-y-4'>
                <div className="bg-white px-2 py-4 border border-slate-800 -mr-4">
                    <div className="event-info flex flex-col">
                        <span className="text-xl bg-pink-200 rounded-full p-2 border border-slate-800 w-fit min-w-[225px]">
                        Host an event
                        </span>
                        <span className="event-date text-lg">Organize an event that brings other passionate members together</span>
                    </div>
                    <div className="event-description text-xl mt-4">
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdc4rY7c3oE-Xj02-v_WqRFt3sl7wnlHFYPbELvnMy0mCfITQ/viewform" target="_blank" rel="noopener noreferrer" className='underline decoration-cpink decoration-4 underline-offset-4'>
                            Apply →
                        </a>
                    </div>
                </div>
            </div>

            <div className='h-full border-l border-slate-800 ml-8 px-4 py-2 space-y-4'>
                <div className="bg-white px-2 py-4 border border-slate-800 -mr-4">
                    <div className="event-info flex flex-col">
                        <span className="text-xl bg-pink-200 rounded-full p-2 border border-slate-800 w-fit min-w-[225px]">
                        Volunteer
                        </span>
                        <span className="event-date text-lg">Organize an event that brings other passionate members together</span>
                    </div>
                    <div className="event-description text-xl mt-4">
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSdc4rY7c3oE-Xj02-v_WqRFt3sl7wnlHFYPbELvnMy0mCfITQ/viewform" target="_blank" rel="noopener noreferrer" className='underline decoration-cpink decoration-4 underline-offset-4'>
                            Apply →
                        </a>
                    </div>
                </div>
            </div>

        </section>

    </div>
  );
}

export default Opportunities;
