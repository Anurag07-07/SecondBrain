import type { ReactElement, ReactNode } from "react"
import './Button.css'
type Varient = "primary" | "secondary"
interface IButton{
  type:Varient
  size:"sm"|"md"|"lg"
  startIcon?:ReactElement
  endIcon?:ReactElement
  children?:ReactNode
  text?:string  
}

type VarientProps = Record<string,string>
type SizeProps = Record<string,string>

const Varients:VarientProps = {
  "primary":"lg:bg-darkgrey-100 lg:dark:bg-white",
  "secondary":" lg:bg-linear-to-r lg:from-cyan-500 lg:to-blue-500"
}

const Size:SizeProps = {
  "sm":"",
  "md":"lg:px-8 lg:py-2 lg:rounded-full",
  "lg":"lg:px-14 lg:py-2 lg:rounded-full lg:text-[1.2rem] lg:dark:"
}

const Button = ({type,size,startIcon,endIcon,children,text}:IButton) => {
  return (
    <button id="button1" className={`${Varients[type]} ${Size[size]}`}>
      {startIcon}{children ? children : text }{endIcon}
    </button>
  )
}

export default Button