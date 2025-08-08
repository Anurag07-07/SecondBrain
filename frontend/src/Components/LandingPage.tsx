import Logo from '../assets/bulb-business-develop-svgrepo-com.svg'
import Button from '../ui/Button'
import ToogleButton from './ToogleButton'
import './Landing.css'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const LandingPage = () => {

  useGSAP(()=>{
    gsap.from('.name',{
      opacity:0,
      duration:0.7,
      delay:0.5,
      translateY:100,
      stagger:0.5,
      ease:'power2.in'
    })
  },[])

  return (
    <div className='lg:flex dark:bg-black  lg:flex-col lg:gap-y-8 lg:w-full lg:h-screen lg:justify-center lg:items-center'>
      <ToogleButton></ToogleButton>
      <div className=' lg:flex lg:gap-x-6 lg:justify-center lg:items-center '>
        {/* Logo */}
        <img src={Logo} alt='Logo'  className=' lg:w-40 lg:bg-white lg:rounded-full' ></img>
        {/* Web App Name */}
        <div>
        <div id='heading' className='name  lg:text-9xl lg:uppercase lg:dark:text-white '><span>Your</span> <span>Idea</span></div>
        <div id='heading' className='name  lg:text-3xl lg:dark:text-white'>the best Place to store second brain</div>
        </div>
      </div>
      <div className=' lg:flex lg:gap-x-5'>
        <Link to={'/signup'}>
        <Button type="primary" size='lg'  >Signup</Button>
        </Link>
        <Link to={'/signin'} >
        <Button type="primary" size='lg'  >Signin</Button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage