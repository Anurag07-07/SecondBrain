import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import '../Components/mainpage.css'
import Navbar from "./Navbar"

const Createpage = () => {

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [link, setLink] = useState<string>("")
  const [type, setType] = useState<string>("pdf")
  const [tag, setTag] = useState<string>("")
  const [tags, setTags] = useState<string[]>([])
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Create A Form Type 
    const payload = {
      title, link, type, tags, description
    }

    console.log(payload);

    try {
      const response = await fetch('https://secondbrain-1-n2ez.onrender.com/api/v1/create', {
        method: "POST",
        headers: {
          "authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (data) {
        console.log(data);
        navigate('/home')
      }

    } catch (error: unknown) {
      console.error(error);
    }
  }

  function HandleAddtag() {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()])
      setTag("")
    }
  }

  function HandleRemovetag(tagToremove: string) {
    const remove = tags.filter((e) => e !== tagToremove)
    setTags(remove)
  }


  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-[90vh] p-4 dark:bg-black dark:text-white transition-all duration-500">
        <form onSubmit={handleSubmit} className="glass p-6 md:p-12 flex flex-col gap-y-6 md:gap-y-10 w-full max-w-lg md:max-w-xl">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-lg md:text-2xl font-medium">Title</label>
            <input
              required
              type="text"
              className="border-b-2 p-2 focus:outline-none focus:border-blue-500 bg-transparent"
              id="title"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-lg md:text-2xl font-medium">Description</label>
            <textarea
              required
              className="border-b-2 p-2 focus:outline-none focus:border-blue-500 bg-transparent"
              id="description"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Link */}
          <div className="flex flex-col gap-2">
            <label htmlFor="link" className="text-lg md:text-2xl font-medium">Link</label>
            <input
              required
              type="text"
              className="border-b-2 p-2 focus:outline-none focus:border-blue-500 bg-transparent"
              id="link"
              placeholder="Enter link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {/* Type */}
          <div className="flex flex-col gap-2">
            <label htmlFor="type" className="text-lg md:text-2xl font-medium">Type</label>
            <select
              className="bg-black text-white p-2 rounded"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="pdf">Pdf</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
              <option value="article">Article</option>
              <option value="image">Image</option>
              <option value="twitter">Twitter</option>
              <option value="youtube">Youtube</option>
              <option value="text">Text</option>
              <option value="website">Website</option>
            </select>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2">
            <label htmlFor="tag" className="text-lg md:text-2xl font-medium">Tags</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter tag"
                className="w-full border-b-2 p-2 focus:outline-none focus:border-blue-500 bg-transparent"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <button
                className="bg-gray-100 text-black border rounded-full px-4 py-2 hover:bg-black hover:text-white transition-all duration-300 dark:bg-white dark:text-black dark:hover:bg-gray-800 dark:hover:text-white"
                type="button"
                onClick={HandleAddtag}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag: string) => (
                <div key={tag} className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                  <span>#{tag}</span>
                  <button
                    className="ml-1 text-red-500 hover:text-red-700 font-bold"
                    type="button"
                    onClick={() => HandleRemovetag(tag)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-blue-600 text-white rounded-full px-6 py-3 font-semibold hover:bg-blue-700 transition-colors duration-300 mt-4"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Createpage