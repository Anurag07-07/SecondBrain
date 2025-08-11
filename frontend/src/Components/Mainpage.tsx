import LogoutButton from './LogoutButton'
import ToogleButton from './ToogleButton'
import './mainpage.css'
import { useEffect, useRef, useState } from 'react'
import axios, { AxiosError } from 'axios'
import Card from '../pages/Card'
import Navbar from '../pages/Navbar'

type userIdProps = {
  id:string,
  username:string
}
export interface IData{
  title:string,
  link:string,
  type:string,
  tags?:string[],
  description?:string,
  userId:userIdProps
}

const Mainpage = () => {

  const [data,setData] = useState<IData[]>([])

  
  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(()=>{

    //Function to get data from the backend
    async function GetData() {
      try {
      
        const response =  await axios.get('http://localhost:3000/api/v1/view_content',{
        headers:{
          'authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.data) {
        //Here response.data is returning data but we have to extract array which is data
        setData(response.data.data)
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


    GetData()

    //Call database after eaach 10 sec so that if someone added something we get data in next refresh
   timeRef.current = setInterval(GetData,10*1000)

   return ()=>{
    //Unmounting
    if (timeRef.current) {
      clearInterval(timeRef.current)
    }
   }
  },[])

  return (
    <div className='  lg:w-full lg:max-h-min lg:dark:bg-black lg:dark:text-white lg:transition-all lg:duration-500'>
      <ToogleButton></ToogleButton>
      <LogoutButton></LogoutButton>
        {/* Navbar */}
        <Navbar></Navbar>
        <div className=' lg:flex lg:flex-wrap lg:gap-y-6 lg:py-4  lg:p-24 lg:w-full lg:h-max '>
          {
            data.map((c)=>(
              <Card description={c.description} key={c.userId.id} tags={c.tags} title={c.title} link={c.link} type={c.type} userId={c.userId}   ></Card>
            ))
          }
        </div>
    </div>
  )
}

export default Mainpage