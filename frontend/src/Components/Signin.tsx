import { useRef, useState, type FormEvent } from 'react';
import './Signup.css';
import ToogleButton from './ToogleButton';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../api/axiosInstance.ts";

const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  async function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    await new Promise((r) => setTimeout(r, 2000)); // shorter delay than 6s

    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      const response = await axiosInstance.post('/api/v1/signin', {
        username,
        password,
      });

      if (response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username',response.data.username)
        console.log(`Successfully login`);
        navigate('/home');
      } else {
        console.log(`Token Not received`);
      }
    } catch (error) {
      console.log('Something went wrong');
      console.error(error);
    } finally {
      setLoading(false);
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

      {/* Signin Form */}
      <form
        className="bg-white/80 dark:bg-black/70 
                   w-[90%] max-w-md p-6 rounded-2xl shadow-xl 
                   flex flex-col gap-6 text-center
                   sm:p-8 sm:gap-8"
        onSubmit={submitHandler}
      >
        {/* Heading */}
        <div className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          SIGNIN
        </div>

        {/* Username */}
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="username" className="text-lg font-medium">Username</label>
          <input
            type="text"
            ref={usernameRef}
            id="username"
            name="username"
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
            ref={passwordRef}
            id="password"
            name="password"
            className="w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-transparent focus:outline-none 
                       focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="w-full mt-2">
          {loading ? (
            <div className="text-pink-600 font-semibold animate-pulse">
              Thank you for your patience...
            </div>
          ) : (
            <Button type="secondary" size="md">Signin</Button>
          )}
        </button>
      </form>
    </div>
  );
};

export default Signin;
