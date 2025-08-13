import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import LandingPage from "./Components/LandingPage"
import Signup from "./Components/Signup"
import Signin from "./Components/Signin"
import Mainpage from "./Components/Mainpage"
import About from "./Components/About"
import Createpage from "./pages/Createpage"
import SharePage from "./pages/GetData.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/signin" element={<Signin></Signin>}></Route>
        <Route path="/main" element={<Mainpage></Mainpage>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/create" element={<Createpage></Createpage>}></Route>
        <Route path={`/share/:shareableLink`} element={<SharePage/>}></Route>
      </Routes>
    </Router>
  )
}

export default App