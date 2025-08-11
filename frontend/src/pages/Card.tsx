import { useGSAP } from "@gsap/react"
import type { IData } from "../Components/Mainpage"

import './card.css'
import gsap from "gsap"
interface ICard extends IData{
  bgcolor?:"black" |"red",
  textcolor?:"white"
}


const Card = ({title,link,tags,type,userId,description}:ICard) => {

  useGSAP(()=>{
    gsap.from('#card',{
      opacity:0,
      y:30
    }
    )
    gsap.to('#card',{
      y:-10,
      opacity:1,
      duration:1.2,
      stagger:0.2
    })
  })

  return (
    <div id="card" className="  lg:m-4 lg:flex lg:flex-col lg:flex-wrap lg:gap-y-3  lg:w-[25vw] lg:justify-center lg:items-start lg:rounded-4xl   lg:p-10 lg:bg-gradient-to-bl from-gray-300 via-darkgrey-100  ">
      <div><span>Title: </span>{title}</div>
      <div className=" lg:font-extralight">{description ?<div><span>Description: </span>{description}</div>:<span></span>}</div>
      <a href={link}><span>Link:</span>{link}</a>
      <div><span>Type: </span>{type}</div>
      <div><span>Tags: </span>{
        tags?.map((d)=>(
          <span>{`#${d}   `}</span>
        ))
      }</div>
    </div>
  )
}

export default Card