import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import ToogleButton from './ToogleButton'
import './mainpage.css'
const Mainpage = () => {
  return (
    <div className=' lg:bg-gradient-to-b from-gray-500 to-gray-200 lg:w-full lg:h-screen'>
      <ToogleButton></ToogleButton>
      <LogoutButton></LogoutButton>
        {/* Navbar */}
        <nav className='glass fixed  lg:flex lg:gap-x-36 lg:text-2xl lg:px-26  lg:rounded-full lg:py-3 lg:top-2 lg:right-96  '>
          <Link to={'/'}>Home</Link>
          <Link to={'/'}>Create</Link>
          <Link to={'/'}>Share</Link>
          <Link to={'/'}>About</Link>
        </nav>
    </div>
  )
}

export default Mainpage