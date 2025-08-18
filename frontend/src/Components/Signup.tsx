import { useState, type ChangeEvent, type FormEvent } from 'react';
import ToogleButton from './ToogleButton';
import './Signup.css';
import Button from '../ui/Button';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../api/axiosInstance.ts";

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
      const response = await axiosInstance.post('/api/v1/signup', {
        email: loginForm.email,
        username: loginForm.username,
        password: loginForm.password,
      });

      console.log(response.data);

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
    <div className="w-full h-screen flex justify-center items-center text-black dark:text-white
                    bg-gradient-to-br from-[#F4C5EF] via-[#FFA69E] to-[#E2DFBE] 
                    dark:from-gray-900 dark:via-black dark:to-gray-700 
                    transition-all duration-500">
      <div className=' fixed top-10 right-20'>
      <ToogleButton/>
      </div>

      {/* Signup Form */}
      <form
        className="bg-white/80 dark:bg-black/70 
                   w-[90%] max-w-md p-6 rounded-2xl shadow-xl 
                   flex flex-col gap-6 text-center
                   sm:p-8 sm:gap-8"
        onSubmit={submitHandler}
      >
        {/* Heading */}
        <div className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          SIGNUP
        </div>

        {/* Email */}
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="email" className="text-lg font-medium">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={loginForm.email}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-transparent focus:outline-none 
                       focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="username" className="text-lg font-medium">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={loginForm.username}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-transparent focus:outline-none 
                       focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="password" className="text-lg font-medium">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginForm.password}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-transparent focus:outline-none 
                       focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="w-full mt-2">
          <Button type="secondary" size="md">Signup</Button>
        </button>
      </form>
    </div>
  );
};

export default Signup;
