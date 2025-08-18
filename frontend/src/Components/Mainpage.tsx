import './mainpage.css' // Ensure this path is correct for your project's CSS file
import { useEffect, useState } from 'react'
import Navbar from '../pages/Navbar' // Ensure this path is correct for your Navbar component
import axiosInstance from "../api/axiosInstance.ts"; // Ensure this path is correct for your axios instance
import { useGSAP } from '@gsap/react'; // Ensure @gsap/react is installed: npm install @gsap/react gsap
import gsap from 'gsap'; // Ensure gsap is installed: npm install gsap
import Card from '../pages/Card.tsx'; // Ensure this path is correct for your Card component

type userIdProps = {
  _id: string | undefined,
  username: string
}

export interface IData {
  _id: string
  title: string,
  link: string,
  type: string,
  tags?: string[],
  description?: string,
  userId?: userIdProps
}

const Mainpage = () => {
  const [data, setData] = useState<IData[]>([])

  async function GetData() {
    try {
      const response = await axiosInstance.get("/api/v1/view_content", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data) {
        console.log(response.data);
        setData([...response.data.data]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    GetData();
  }, []);

  useGSAP(() => {
    gsap.timeline().from('.anim', {
      y: 50,
      stagger: 0.2,
      opacity: 0,
      ease: "power1.inOut"
    })
  })

  useGSAP(() => {
    gsap.from(".masonry-card", {
      y: 50,
      opacity: 0,
      stagger: 0.05,
      ease: "power1.inOut"
    });
  });

  return (
    <>
      <Navbar />
      {/* Main Container - Adjusted for Dark Mode */}
      <div className='flex flex-col lg:flex-row lg:justify-center min-h-[90.8vh] w-full bg-white dark:bg-gray-900 transition-colors duration-500'>
        {/* Greeting Section - Adjusted for Dark Mode */}
        <div className='flex flex-col justify-center p-6 lg:p-10 gap-y-3 lg:w-1/2 lg:gap-y-6 text-black dark:text-white'>
          <div className='anim uppercase text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light'>HELLO {(data[0]?.userId?.username)?.toUpperCase() || ""}!</div>
          <div className='anim text-2xl sm:text-3xl md:text-4xl lg:text-6xl'>
            {(new Date().getHours() > 21 || new Date().getHours() < 4)
              ? "Good Night"
              : new Date().getHours() > 18
              ? "Good Evening"
              : new Date().getHours() > 12
              ? "Good Afternoon"
              : "Good Morning"}
          </div>
          <div className='text-lg md:text-xl lg:text-3xl font-bold flex flex-col'>
            <div className='anim text-gray-600 dark:text-gray-400'>You've stored</div>
            <div className='anim text-red-600'>{data.length} of <span className='text-gray-600 dark:text-gray-400'>your</span></div>
            <div className='anim text-gray-600 dark:text-gray-400'>Tasks Here.</div>
          </div>
        </div>
        {/* Cards Section - Background already suitable for Dark Mode */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-gray-800 lg:h-[90.8vh] overflow-auto scrollbar-hidden p-4 gap-4">
          {data.map((c) => (
            <div key={c._id} className="masonry-card">
              <Card
                getCard={GetData}
                description={c.description}
                tags={c.tags}
                title={c.title}
                link={c.link}
                type={c.type}
                _id={c._id}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Mainpage
