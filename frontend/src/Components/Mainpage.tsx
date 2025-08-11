import LogoutButton from './LogoutButton'
import ToogleButton from './ToogleButton'
import './mainpage.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '../pages/Card'
import Navbar from '../pages/Navbar'
import { CiShare2 } from "react-icons/ci";

type userIdProps = {
  _id:string | undefined,
  username:string
}
export interface IData{
  _id:string
  title:string,
  link:string,
  type:string,
  tags?:string[],
  description?:string,
  userId?:userIdProps
}

const Mainpage = () => {

  const [data,setData] = useState<IData[]>([])

  
  // const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  async function GetData() {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/view_content", {
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
   }, [data]);

  return (
    <>
      <button className={` lg:fixed lg:top-5 lg:cursor-pointer lg:left-10 lg:dark:text-black lg:dark:bg-white lg:px-5 lg:flex lg:justify-center lg:items-center lg:gap-x-3 lg:py-2 lg:rounded-4xl`} ><span><CiShare2></CiShare2></span>Share</button>
      <ToogleButton></ToogleButton>
      <LogoutButton></LogoutButton>
      <Navbar></Navbar>
      <div className='  lg:w-full lg:min-h-screen lg:dark:bg-black lg:dark:text-white lg:transition-all lg:duration-500'>
        <div className=' lg:flex  lg:flex-wrap   lg:w-full lg:justify-around lg:gap-y-6   '>
          {
            data.map((c)=>(
              <Card getCard={GetData} description={c.description}  tags={c.tags} title={c.title} key={c._id}  link={c.link} type={c.type} _id={c._id}   ></Card>
            ))
          }
        </div>
    </div>
    </>
  )
}

export default Mainpage