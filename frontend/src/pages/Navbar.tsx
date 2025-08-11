import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
       <div className='  lg:w-full lg:h-20 lg:dark:text-white lg:dark:bg-black lg:transition-all lg:duration-500'>
        <nav className='glass fixed  lg:flex lg:gap-x-36 lg:text-2xl lg:px-26  lg:rounded-full lg:py-3 lg:top-2 lg:right-96 lg:z-50  '>
          <Link to={'/main'}>Home</Link>
          <Link to={'/create'}>Create</Link>
          <Link to={'/'}>Share</Link>
          <Link to={'/about'}>About</Link>
        </nav>
        </div>
    </div>
  )
}

export default Navbar