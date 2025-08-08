import  { useState } from 'react'
import { FaMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
document.addEventListener('DOMContentLoaded',function(){
  const toogleDark = document.getElementById('toogleDark')
  toogleDark?.addEventListener('onclick',()=>{
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark')
    }else{
      document.documentElement.classList.add('dark')
    }
  })
})

const ToogleButton = () => {

  const [toogle,setToogle] = useState(false)

  function toogling() {
    document.body.classList.toggle('dark')
    setToogle(prev=>!prev)
  }

  return (
    <div onClick={toogling} className={` lg:fixed lg:text-4xl lg:right-10 lg:top-4 lg:z-50  ${toogle ? `text-white`:`text-black`}`}>
      {
        toogle ? <MdOutlineWbSunny />:<FaMoon /> 
      }
    </div>
  )
}

export default ToogleButton