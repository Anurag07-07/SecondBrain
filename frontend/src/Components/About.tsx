import React from 'react';
import './about.css';
import Navbar from '../pages/Navbar';

const About: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className='w-full p-6 md:p-10 flex flex-col items-center dark:bg-black transition-all duration-500'>
        <div className='w-full max-w-4xl flex flex-col gap-y-6 md:gap-y-8 dark:text-white'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold'>About Your Idea</h1>
          <p className='text-lg md:text-xl'>
            Welcome to Your Idea—your personal digital vault for the future.
          </p>
          <p className='text-base md:text-lg'>
            Life moves fast, and important ideas, plans, and memories can easily get lost. That's why we built Your Idea — a secure and organized place to store everything you might need later.
          </p>

          <h2 className='text-2xl md:text-3xl font-semibold mt-4'>What You Can Store</h2>
          <ul className='list-disc list-inside space-y-2 text-base md:text-lg pl-4'>
            <li>📄 Save important documents for quick access.</li>
            <li>🖼️ Keep images that matter to you.</li>
            <li>🎥 Store videos you’ll want to revisit.</li>
            <li>📝 Write down plans, tasks, or notes for the future.</li>
          </ul>

          <p className='text-base md:text-lg mt-4'>
            Everything you save stays private, organized, and accessible anytime, anywhere. Whether it’s a business idea, travel plan, work file, or a memory, you’ll have it ready when you need it.
          </p>
          <p className='text-lg md:text-xl font-bold mt-2'>
            Our mission is simple: Help you save today for a better tomorrow.**
          </p>

          <h2 className='text-2xl md:text-3xl font-semibold mt-8'>Future Features</h2>
          <ul className='list-disc list-inside space-y-2 text-base md:text-lg pl-4'>
            <li>Enhanced file uploads for various media types.</li>
            <li>A collaborative chat room to connect with others.</li>
            <li>Advanced AI Search capabilities.</li>
            <li>Full mobile-first design and app support.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;