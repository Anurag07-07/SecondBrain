import { useRef, type ChangeEvent, type FormEvent } from 'react'
import './Signup.css'
import ToogleButton from './ToogleButton'
import axios from 'axios'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'


const Signin = () => {

  const usernameRef = useRef<string>("")
  const passwordRef = useRef<string>("")
  const navigate = useNavigate()

  function handleChange(e:ChangeEvent<HTMLInputElement>) {
    if (e.target.name === 'username') {
      usernameRef.current = e.target.value
    }
    else if (e.target.name === 'password' ) {
      passwordRef.current = e.target.value
    }
  }

  async function submitHandler(e:FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
       const response =  await axios.post('https://secondbrain-9dlm.onrender.com/api/v1/signin',{
        username:usernameRef.current,
        password:passwordRef.current
       })
       
       if (response.data) {
        console.log(response.data.token);
        localStorage.setItem('token',response.data.token)
        console.log(`Successfully login`);
        navigate('/main')
      }else{
        console.log(`Token Not recieved`);
       }
    } catch (error:any) {
      console.log('Something went Wrong');
      console.error(error);
    }
  }



  return (
   <div className=' transition-all duration-500  lg:w-full lg:dark:bg-black lg:h-screen lg:flex lg:text-white lg:justify-center lg:items-center'>
      <ToogleButton></ToogleButton>
        {/* Signup Page */}
      <form className=' lg:bg-gradient-to-l lg:gap-y-10  lg:from-gray-700 lg:to-black lg:shadow-lg lg:shadow-black lg:w-96 lg:h-[70vh] lg:fixed lg:rounded-2xl lg:flex lg:flex-col lg:justify-center lg:items-center lg:dark:shadow-md lg:dark:shadow-white dark:lg:bg-gradient-to-b dark:lg:to-white ' onSubmit={submitHandler}>
        <div className=' lg:text-center lg:fixed lg:top-10 lg:text-5xl lg:text-black lg:dark:text-white'>SIGNIN</div>
        <div className=' lg:flex lg:flex-col'>
        <label htmlFor='username' className=' lg:text-2xl'>Username</label>
        <input type='text' ref={usernameRef} defaultValue="" id='username' onChange={handleChange} name='username' className=' lg:bg-transparent  lg:w-72 lg:h-10  lg:border-b-2 lg:border-white  '></input>
        </div>
        <div className=' lg:flex lg:flex-col'>
        <label htmlFor='password' className=' lg:text-2xl'>Password</label>
        <input ref ={passwordRef} defaultValue=""  type='password' name='password'  onChange={handleChange} className=' lg:bg-transparent  lg:w-72 lg:h-10  lg:border-b-2 lg:border-white  '></input>
        </div>
        <button type='submit'>
          <Button type='secondary' size='md'>Signin</Button>
        </button>
      </form>
    </div>
  )
}

export default Signin