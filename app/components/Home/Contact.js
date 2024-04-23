import React from 'react'

function Contact() {
  return (
    <section className="w-full flex justify-center mb-10">
        <section className="w-full max-w-1440 flex min-h-[50vh] flex-col justify-center items-center mx-5 p-2 bg-slate-800 text-cream space-y-10">
            <h1 className='text-cream'>Contact Us</h1>
            <p className='text-center text-lg md:text-2xl'>
                Interested in joining our mission or have questions? Contact our president Maximus Powers at 
                <a href='mailto:maximus@ethicalspectacle.com' className='underline pl-2'>
                  maximus@ethicalspectacle.com
                </a>
            </p>
        </section>  
    </section>
  )
}

export default Contact