import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import ToogleButton from './ToogleButton'
import './mainpage.css'
import { useEffect, useRef, useState } from 'react'
import axios, { AxiosError } from 'axios'
import Card from '../pages/Card'

type userIdProps = {
  id:string,
  username:string
}
export interface IData{
  title:string,
  link:string,
  type:string,
  tags?:string[],
  userId:userIdProps
}

const Mainpage = () => {

  const [data,setData] = useState<IData[]>([])
  const [loading,setLoading] = useState<boolean>(false)

  //Function to get data from the backend
  async function GetData() {
      setLoading(true)
      try {
      
        const response =  await axios.get('http://localhost:3000/api/v1/view_content',{
        headers:{
          'authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.data) {
        //Here response.data is returning data but we have to extract array which is data
        setData(response.data.data)
        setLoading(false)
      }
        
      } catch (error) {
        const err = error as AxiosError<{type:string}>
        if (err.response) {
          console.log(err.response.data);
        }else{
          console.log(err.message);
          
        }
      }
    }

  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(()=>{

    //Call database after eaach 10 sec so that if someone added something we get data in next refresh
   timeRef.current = setTimeout(GetData,10*1000)

   return ()=>{
    //Unmounting
    if (timeRef.current) {
      clearInterval(timeRef.current)
    }
   }
  },[])

  return (
    <div className='  lg:w-full lg:h-screen lg:dark:bg-black lg:dark:text-white'>
      <ToogleButton></ToogleButton>
      <LogoutButton></LogoutButton>
        {/* Navbar */}
        <div className='  lg:w-full lg:h-20 lg:dark:bg-black'>
        <nav className='glass fixed  lg:flex lg:gap-x-36 lg:text-2xl lg:px-26  lg:rounded-full lg:py-3 lg:top-2 lg:right-96  '>
          <Link to={'/main'}>Home</Link>
          <Link to={'/create'}>Create</Link>
          <Link to={'/'}>Share</Link>
          <Link to={'/about'}>About</Link>
        </nav>
        </div>
        <div>
          {
            loading ? <h1>Loading...</h1> : data.map((c)=>(
              <Card key={c.userId.id} title={c.title} link={c.link} type={c.type} userId={c.userId}   ></Card>
            ))
          }
        </div>
    </div>
  )
}

export default Mainpage