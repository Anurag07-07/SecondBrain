import { useState, type FormEvent } from "react"
import ToogleButton from "../Components/ToogleButton"
import Closepage from "../ui/Closepage"
import { useNavigate } from "react-router-dom"

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
      const response = await fetch('https://secondbrain-9dlm.onrender.com/api/v1/signin',{
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

  return (
    <div>
      <ToogleButton></ToogleButton>
      <Closepage></Closepage>
      <div className=" lg:flex lg:flex-col lg:w-full lg:h-screen lg:bg-amber-300  lg:justify-center lg:items-center">
        <div className=" lg:text-7xl">Create Page</div>
        <form onSubmit={handleSubmit}>
          <div>
          <label htmlFor="title">Title</label>
          <input required type="text" id="title" placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
          </div>
          <div>
          <label htmlFor="link">Link</label>
          <input required type="text" id="link" placeholder="Enter link" value={link} onChange={(e)=>setLink(e.target.value)}></input>
          </div>
          <div>
          <label htmlFor="link">Type</label>
          <select id="link"  value={type} onChange={(e)=>setType(e.target.value)}>
            <option value="pdf">Pdf</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
            <option value="article">Article</option>
            <option value="image">Image</option>
          </select>
          <label htmlFor="tag">Tags</label>
          <input type="text" placeholder="Enter tag" value={tag} onChange={(e)=>setTag(e.target.value)}></input>
          <button type="button" onClick={HandleAddtag}>Add Tag</button>
          </div>
          <div>
            {
              tags.map((tag:string)=>(
                <div key={tag}>
                  <div>{tag}</div>
                  <button  type="button"  onClick={()=>HandleRemovetag(tag)}>X</button>
                </div>
              ))
            }
          </div>
          <button type="submit" >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Createpage