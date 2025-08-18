import { useNavigate } from 'react-router-dom'
import { IoIosLogOut } from "react-icons/io";



const LogoutButton = () => {
  const navigate = useNavigate()
  async function LogoutDone(e:React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    localStorage.removeItem('token')
    navigate('/')
    console.log(`Logout Successfully`);
  }


  return (
    <button onClick={LogoutDone} className='flex justify-center items-center lg:flex lg:justify-center lg:items-center lg:gap-x-1 lg:text-xl lg:font-extralight lg:text-gray-500 lg:hover:text-red-600'>
     {<IoIosLogOut></IoIosLogOut>}Logout 
    </button>
  )
}

export default LogoutButton