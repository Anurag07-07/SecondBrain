import { useState, type ChangeEvent, type FormEvent } from 'react';
import ToogleButton from './ToogleButton';
import './Signup.css';
import Button from '../ui/Button';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface IForm {
  email: string;
  username: string;
  password: string;
}

const Signup = () => {
  const [loginForm, setLoginForm] = useState<IForm>({
    email: '',
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await axios.post('https://secondbrain-9dlm.onrender.com/api/v1/signup', {
        email: loginForm.email,
        username: loginForm.username,
        password: loginForm.password,
      });

      if (response.data) {
        navigate('/signin');
      } else {
        console.log(`Data was not received`);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      console.log(`Something went wrong`);

      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  }

  return (
    <div className='transition-all duration-500 lg:w-full lg:dark:bg-black lg:h-screen lg:flex lg:text-white lg:justify-center lg:items-center'>
      <ToogleButton />
      {/* Signup Page */}
      <form
        className='lg:bg-gradient-to-l lg:gap-y-10 lg:from-gray-700 lg:to-black lg:shadow-lg lg:shadow-black lg:w-96 lg:h-[70vh] lg:fixed lg:rounded-2xl lg:flex lg:flex-col lg:justify-center lg:items-center lg:dark:shadow-md lg:dark:shadow-white dark:lg:bg-gradient-to-b dark:lg:to-white'
        onSubmit={submitHandler}
      >
        <div className='lg:text-center lg:fixed lg:top-10 lg:text-5xl lg:text-black lg:dark:text-white'>
          SIGNUP
        </div>

        <div className='lg:flex lg:flex-col'>
          <label htmlFor='email' className='lg:text-2xl'>Email</label>
          <input
            type='text'
            id='email'
            name='email'
            value={loginForm.email}
            onChange={handleChange}
            className='lg:bg-transparent lg:w-72 lg:h-10 lg:border-b-2 lg:border-white'
          />
        </div>

        <div className='lg:flex lg:flex-col'>
          <label htmlFor='username' className='lg:text-2xl'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            value={loginForm.username}
            onChange={handleChange}
            className='lg:bg-transparent lg:w-72 lg:h-10 lg:border-b-2 lg:border-white'
          />
        </div>

        <div className='lg:flex lg:flex-col'>
          <label htmlFor='password' className='lg:text-2xl'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={loginForm.password}
            onChange={handleChange}
            className='lg:bg-transparent lg:w-72 lg:h-10 lg:border-b-2 lg:border-white'
          />
        </div>

        <button type='submit'>
          <Button type='secondary' size='md'>Signup</Button>
        </button>
      </form>
    </div>
  );
};

export default Signup;
