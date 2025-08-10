import Button from "./Button"
import { IoArrowUndoSharp } from "react-icons/io5";
const Closepage = () => {

  return (
      <Button link="main" type="primary" size="md" startIcon={<IoArrowUndoSharp size={30} />} >Back to Main Page</Button>
  )
}

export default Closepage