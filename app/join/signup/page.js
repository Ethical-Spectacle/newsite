'use client';
import React from 'react';
import Authentication from "./components/Authentication"

function page() {
  return (
    <section className="h-screen flex justify-center">
        <div className="boxed-container flex justify-center items-center">
            <Authentication />
        </div>
    </section>
  )
}

export default page