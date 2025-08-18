import './Landing.css'
import landImg from '../assets/Screenshot 2025-08-16 060537.png'
import bulb from '../assets/bulb-business-develop-svgrepo-com.svg'
import pen from '../assets/pen-svgrepo-com.svg'
import task from '../assets/tasks-tick-svgrepo-com.svg'
import todo from '../assets/todo-pencil-svgrepo-com.svg'
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const LandingPage = () => {
  useGSAP(() => {
    gsap.timeline().from('.anim', {
      opacity: 0,
      y: 60,
      duration: 1,
      stagger: 0.2
    })
    gsap.fromTo('.card', {
      scale: 0, duration: 2
    }, { scale: 1, duration: 2 })
  })

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-[#F4C5EF] via-[#FFA69E] to-[#E2DFBE]">
      <div className="w-full glass  h-full flex flex-col lg:w-[95%] lg:h-[95%] lg:flex lg:flex-row lg:items-center lg:justify-center">
        
        {/* Left Section */}
        <div className="w-full h-1/2 flex  mt-11 flex-col justify-center items-center px-5 gap-y-4 text-center
                        lg:w-1/2 lg:h-full lg:items-start lg:text-left lg:px-10 lg:gap-y-5">
          {/* Heading */}
          <div className="text-4xl sm:text-3xl md:text-4xl lg:text-6xl leading-snug">
            <h1 className="anim">Stay organize your</h1>
            <h1 className="anim">task and workflow just</h1>
            <h1 className="anim">in your finger</h1>
          </div>

          {/* Paragraph */}
          <div className="anim text-sm sm:text-base md:text-lg lg:text-xl lg:font-extralight">
            Regain clarity and calmness by getting all those tasks out of your head and onto your to-do list 
            no matter where you are or what device you use.
          </div>

          {/* Buttons */}
          <div className="flex gap-x-4 justify-center items-center mt-4 lg:gap-x-6">
            <Link to={'/signup'}>
              <button className="anim bg-black text-white flex justify-center items-center w-28 h-10 rounded-md shadow-md shadow-black lg:w-36">
                Get Started <MdArrowForwardIos className="ml-1" />
              </button>
            </Link>
            <Link to={'/signin'}>
              <button className="anim flex justify-center items-center gap-x-1 uppercase">
                Sign in <MdArrowForwardIos />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-full h-1/2 flex justify-center items-center
                        lg:w-1/2 lg:h-full">
          <div className="absolute hidden lg:block lg:w-[95%] lg:h-[95%] lg:bg-gradient-to-tl lg:from-[#7CA1FF] lg:via-[#A9A7E7] lg:to-[#DEDCC2] lg:shadow-2xl lg:shadow-amber-200 lg:-z-10 lg:rounded-full"></div>

          <img src={landImg} className="card w-5/6 sm:w-3/5  md:w-1/2 lg:w-[90%] rounded-3xl" alt="landing" />

          {/* Floating Icons */}
          <img className="icon absolute w-15 sm:w-12 animate-bounce top-10 right-10 lg:w-18 lg:top-15 lg:right-30" alt="task" src={task} />
          <img className="icon absolute w-12 sm:w-14 animate-bounce bottom-10 left-10 lg:w-22 lg:bottom-10 lg:left-40" alt="todo" src={todo} />
          <img className="icon absolute w-12 sm:w-12 animate-bounce bottom-20 right-12 lg:w-18 lg:bottom-35 lg:right-30" alt="pen" src={pen} />
          <img className="icon absolute w-10 sm:w-10 animate-bounce top-14 left-12 lg:w-14 lg:top-25 lg:left-24" alt="bulb" src={bulb} />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
