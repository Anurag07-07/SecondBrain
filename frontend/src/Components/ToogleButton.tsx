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
    <div onClick={toogling}>
      {
        toogle ? <MdOutlineWbSunny />:<FaMoon /> 
      }
    </div>
  )
}

export default ToogleButton