import { useGSAP } from "@gsap/react"
import type { IData } from "../Components/Mainpage"
import { IoIosTrash } from "react-icons/io";
import './card.css'
import gsap from "gsap"
import axios, {  AxiosError } from "axios";
import { useRef } from "react";
interface ICard extends IData{
  bgcolor?:"black" |"red",
  textcolor?:"white",
  getCard?:()=>void
}


const Card = ({title,link,tags,type,_id,description,getCard}:ICard) => {

  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(cardRef.current, {
      opacity: 0,
      y: 30
    },
    {
      y: -10,
      opacity: 1,
      duration: 1.2,
    });
  },[]);



  async function handleDeleteCard(e:string) {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/delete_content/${e}`,{
        headers:{
          'authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })

  
      if (response.data) {
        console.log(response.data);
        if (getCard) {
          getCard()
        }
      }
      
    } catch (error) {
      const err = error as AxiosError<{type:string}>
      if (err.message) {
        console.log(err.response?.status);
      }else{
        console.error(err.response?.data);
        
      }
    }
  }

  return (
    <div ref={cardRef} className=" card-container lg:relative   lg:flex lg:flex-col lg:flex-wrap lg:gap-y-3  lg:w-[25vw] lg:justify-center lg:items-start lg:rounded-4xl   lg:p-10 lg:bg-gradient-to-bl from-gray-300 via-darkgrey-100  ">
      <div><span>Title: </span>{title}</div>
      <div className=" lg:font-extralight">{description ?<div><span>Description: </span>{description}</div>:<span></span>}</div>
      <a href={link} target="blank"><span>Link:</span>{link}</a>
      <div><span>Type: </span>{type}</div>
      <div><span>Tags: </span>{
        tags?.map((d)=>(
          <span className=" lg:bg-blue-200 lg:rounded-2xl lg:px-2 lg:text-blue-700">{`#${d}   `}</span>
        ))
      }</div>
      <button onClick={()=>handleDeleteCard(_id)}  className=" lg:absolute lg:top-5 lg:right-8 lg:hover:bg-red-600 lg:transition-all lg:duration-500 lg:rounded-2xl lg:p-2">{<IoIosTrash size={20}></IoIosTrash>}</button>
    </div>
  )
}

export default Card