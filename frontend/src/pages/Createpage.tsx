import { useState, type FormEvent } from "react"
import ToogleButton from "../Components/ToogleButton"
import { useNavigate } from "react-router-dom"
import Button from "../ui/Button"
import { IoArrowUndoSharp } from "react-icons/io5"
import '../Components/mainpage.css'

const Createpage = () => {

  const [title,setTitle] = useState<string>("")
  const [link,setLink] = useState<string>("")
  const [type,setType] = useState<string>("pdf")
  const [tag,setTag] = useState<string>("")
  const [tags,setTags] = useState<string[]>([])
  const navigate = useNavigate()
  async function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault()

    //Create A Form Type 
    const payload = {
      title,link,type,tags
    }

    
    try {
      const response = await fetch('https://secondbrain-9dlm.onrender.com/api/v1/create',{
      method:"POST",
      headers:{
        "authorization":`Bearer ${localStorage.getItem('token')}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify(payload)
    })

    const data = await response.json()

    if (data) {
      console.log(data);
      navigate('/main')
    }
      
    } catch (error:unknown) {
      console.error(error);
    }
  }

  function HandleAddtag() {
    if (tag.trim() && !tags.includes(tag.trim()) ) {
      setTags([...tags,tag.trim()])
      setTag("")
    }
  }
  
  function HandleRemovetag(tagToremove:string) {
    const remove = tags.filter((e)=>e!==tagToremove)
    setTags(remove)
  }


  function Navigation() {
    navigate('/main')
  }

  return (
    <div>
      <div onClick={Navigation}>
      <Button type="primary" size="md" startIcon={<IoArrowUndoSharp size={30} />}>Back to Main Page</Button>
      </div>
      <div className=" lg:flex  lg:h-screen lg:flex-col lg:w-full  lg:bg-black lg:text-white lg:transition-all lg:duration-1000  lg:justify-center lg:items-center"> 
        <form onSubmit={handleSubmit} className="glass lg:px-28 lg:py-12 lg:flex lg:flex-col lg:gap-y-10 ">
          <div className=" lg:flex flex-col">
          <label htmlFor="title" className=" lg:text-3xl ">Title</label>
          <input required type="text" className=" lg:border-b-2 lg:w-[40vw] lg:text-2xl  "  id="title" placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
          </div>
          <div  className=" lg:flex flex-col">
          <label  htmlFor="link"  className=" lg:text-3xl ">Link</label>
          <input  className=" lg:border-b-2 lg:w-[40vw] lg:text-2xl  "  required type="text" id="link" placeholder="Enter link" value={link} onChange={(e)=>setLink(e.target.value)}></input>
          </div>
          <div className=" lg:flex lg:flex-col lg:gap-y-3">
          <label className="lg:text-3xl  lg:flex flex-col" htmlFor="link">Type</label>
          <select className=" lg:bg-black lg:text-white" id="link"  value={type} onChange={(e)=>setType(e.target.value)}>
            <option value="pdf">Pdf</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
            <option value="article">Article</option>
            <option value="image">Image</option>
          </select>
          <div className=" lg:flex flex-col">
          <label  className=" lg:text-3xl "   htmlFor="tag">Tags</label>
          <div className=" lg:flex lg:gap-x-[40vh]">
          <input type="text" placeholder="Enter tag" value={tag} onChange={(e)=>setTag(e.target.value)}></input>
          <button  className=" lg:bg-white lg:text-black lg:border lg:rounded-full lg:px-3 lg:py-1 lg:hover:bg-black lg:hover:text-white lg:transition-all lg:duration-500 " type="button" onClick={HandleAddtag}>Add Tag</button>
          </div>
          </div>
          </div>
          <div className=" lg:flex lg:gap-x-1 lg:flex-wrap  lg:w-[40vw]">
            {
              tags.map((tag:string)=>(
                <div key={tag} className=" lg:flex lg:justify-start lg:items-center lg:gap-x-1">
                  <div className=" lg:text-xl">{tag}</div>
                  <button className=" lg:bg-white lg:text-black lg:border lg:rounded-full lg:px-3 lg:py-1 lg:hover:bg-black lg:hover:text-white lg:transition-all lg:duration-500 "  type="button"  onClick={()=>HandleRemovetag(tag)}>X</button>
                </div>
              ))
            }
          </div>
          <button className=" lg:bg-white lg:text-black  lg:rounded-full lg:px-3 lg:py-1 lg:hover:bg-black lg:hover:text-white lg:transition-all lg:duration-500 "  type="submit" >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Createpage