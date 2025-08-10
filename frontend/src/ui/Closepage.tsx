import { useNavigate } from "react-router-dom";
import Button from "./Button"
import { IoArrowUndoSharp } from "react-icons/io5";
const Closepage = () => {

  const navigate = useNavigate()

  function Navigation() {
    navigate('/main')
  }

  return (
    <button onClick={Navigation}>
      <Button  type="primary" size="md" startIcon={<IoArrowUndoSharp size={30} />} >Back to Main Page</Button>
    </button>
  )
}

export default Closepage