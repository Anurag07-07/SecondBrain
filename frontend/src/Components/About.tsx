import React from 'react'
import ToogleButton from './ToogleButton'
import './about.css'
import Navbar from '../pages/Navbar'
const About:React.FC = () => {
  return (
    <>
    <Navbar></Navbar>
    <ToogleButton></ToogleButton>
    <div className=' lg:w-full lg:h-full  lg:pt-9  lg:flex lg:justify-center lg:items-center  dark:lg:bg-black transition-all duration-500'>
      <div className=' lg:w-[50vw]  lg:flex lg:flex-col lg:justify-center lg:gap-y-5 lg:dark:text-white'>
        <h1 className=' lg:text-6xl'>About Your Idea</h1>
        <p className=' lg:text-2xl'>Welcome to <strong>You Idea</strong>- your personal digital vault for the future</p>
        <p className=' lg:text-xl'>Life moves fast, and important ideas, plans, and memories can easily get lost.
        That’s why we built Your Idea — a secure and organized place to store everything you
        might need later.</p>
        <ul>
        <li className=' lg:text-xl'>📄 Save important <strong>documents</strong> for quick access.</li>
        <li className=' lg:text-xl'>🖼️ Keep <strong>images</strong> that matter to you.</li>
        <li className=' lg:text-xl'>🎥 Store <strong>videos</strong> you’ll want to revisit.</li>
        <li className=' lg:text-xl'>📝 Write down <strong>plans, tasks, or notes</strong> for the future.</li>
      </ul>
      <p className=' lg:text-xl'>
        Everything you save stays <strong>private, organized, and accessible</strong> anytime, anywhere.
        Whether it’s a business idea, travel plan, work file, or a memory, you’ll have it ready when you need it.
      </p>
      <p className=' lg:text-xl'>
        Our mission is simple: <strong>Help you save today for a better tomorrow.</strong>
      </p>
      <p className='lg:text-6xl'>In Future you Expect</p>
      <ul>
        <li className='lg:text-xl'>Add Images</li>
        <li className='lg:text-xl'>Add Videos</li>
        <li className='lg:text-xl'>Chat room where you can talk with different people in the world</li>
        <li className='lg:text-xl'>AI Search</li>
        <li className='lg:text-xl'>Mobile Responsive</li>
      </ul>
      </div>
    </div>
    </>
  )
}

export default About