import  { useState } from "react";
import { CiShare2 } from "react-icons/ci";
import axios, {type AxiosError} from "axios";

const ShareButton = () => {

    const  [toogle,setToogle] = useState<boolean>(true);

  const GetData:()=>Promise<void> = async () => {
       try {
           const response = await axios.post('https://secondbrain-ne5n.onrender.com/api/v1/share',{
               share:true
           },{
               headers:{
                   "authorization":`Bearer ${localStorage.getItem('token')}`
               }
           })

           if (response.data){
               console.log(response.data)
               setToogle(false)
               localStorage.setItem('link',response.data.message)
               const  link = localStorage.getItem('link')
               navigator.clipboard.writeText(`https://secondbrain-ne5n.onrender.com/share/${link}`)
           }
       }catch (e:unknown) {
           const  error = e as AxiosError<{type:string}>
           if (error.response){
               console.log(error.response)
           }else{
               console.log(error)
           }
       }
  }


  const  removeLink = async ():Promise<void>=>{
      try {
          const response = await  axios.post('https://secondbrain-ne5n.onrender.com/api/v1/share',{
              share:false
          },{
              headers:{
                  'authorization':`Bearer ${localStorage.getItem('token')}`
              }
          })
          if (response.data){
              localStorage.removeItem('link')
              setToogle(true)
          }
      }catch (e) {
          console.log(`Something went Wrong`)
          console.error(e)
      }
  }

  return (
    <div>
      {
        toogle ? (
      <button onClick={GetData} className={`${toogle ? `lg:dark:text-black  lg:dark:bg-white`:``} lg:fixed lg:top-5 lg:cursor-pointer lg:left-10  lg:px-5 lg:flex lg:justify-center lg:items-center lg:gap-x-3 lg:py-2 lg:rounded-4xl`}>{<CiShare2/>}Share</button>):<div className={`${!toogle ? `lg:dark:text-black  lg:dark:bg-white`:``} lg:fixed lg:top-5 lg:cursor-pointer lg:left-10  lg:px-5 lg:flex lg:justify-center lg:items-center lg:gap-x-3 lg:py-2 lg:rounded-4xl`} onClick={removeLink}>{<CiShare2></CiShare2>}Don't Share</div>
      }
    </div>
  )
}

export default ShareButton
