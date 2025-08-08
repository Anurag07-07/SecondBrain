import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'




const LogoutButton = () => {
  const navigate = useNavigate()
  async function LogoutDone(e:React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    localStorage.removeItem('token')
    navigate('/')
    console.log(`Logout Successfully`);
  }


  return (
    <button onClick={LogoutDone} className=' lg:fixed lg:top-4 lg:right-20'>
      <Button type='secondary'size='md' >
        Logout
      </Button>
    </button>
  )
}

export default LogoutButton