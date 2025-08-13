import { useRef, useState, type FormEvent } from 'react';
import './Signup.css';
import ToogleButton from './ToogleButton';
import axios from 'axios';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [loading,setloading] = useState<boolean>(false)

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
   
    setloading(true)

    await new Promise((r)=>setTimeout(r,6000))

    
    
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      const response = await axios.post('https://secondbrain-ne5n.onrender.com/api/v1/signin', {
        username,
        password
      });

      if (response.data) {
        console.log(response.data.token);
        localStorage.setItem('token', response.data.token);
        console.log(`Successfully login`);
        navigate('/main');
      } else {
        console.log(`Token Not received`);
      }
    } catch (error) {
      console.log('Something went wrong');
      console.error(error);
    }finally{
      setloading(false)
    }
  }

  return (
    <div className='transition-all duration-500 lg:w-full lg:dark:bg-black lg:h-screen lg:flex lg:text-white lg:justify-center lg:items-center'>
      <ToogleButton />
      {/* Signin Page */}
      <form
        className='lg:bg-gradient-to-l lg:gap-y-10 lg:from-gray-700 lg:to-black lg:shadow-lg lg:shadow-black lg:w-96 lg:h-[70vh] lg:fixed lg:rounded-2xl lg:flex lg:flex-col lg:justify-center lg:items-center lg:dark:shadow-md lg:dark:shadow-white dark:lg:bg-gradient-to-b dark:lg:to-white'
        onSubmit={submitHandler}
      >
        <div className='lg:text-center lg:fixed lg:top-10 lg:text-5xl lg:text-black lg:dark:text-white'>
          SIGNIN
        </div>

        <div className='lg:flex lg:flex-col'>
          <label htmlFor='username' className='lg:text-2xl'>Username</label>
          <input
            type='text'
            ref={usernameRef}
            id='username'
            name='username'
            className='lg:bg-transparent lg:w-72 lg:h-10 lg:border-b-2 lg:border-white'
          />
        </div>

        <div className='lg:flex lg:flex-col'>
          <label htmlFor='password' className='lg:text-2xl'>Password</label>
          <input
            type='password'
            ref={passwordRef}
            id='password'
            name='password'
            className='lg:bg-transparent lg:w-72 lg:h-10 lg:border-b-2 lg:border-white'
          />
        </div>

        <button type='submit'>
          {
            loading ? <h1>Thank you for patience...</h1>:<Button type='secondary' size='md'>Signin</Button>
          }
        </button>
      </form>
    </div>
  );
};

export default Signin;
