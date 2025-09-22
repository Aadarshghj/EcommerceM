import React, { use, useEffect, useState } from 'react'
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from '../stores/useUserStore';
import { Navigate, Link, useNavigate } from 'react-router-dom';

const Login = () => {
const {login , loading ,user} = useUserStore();
const[val,setval] =useState({})
 const navigate = useNavigate(); 
  const handleSubmit = (e) => { 
  e.preventDefault(e);
    login(val);
   navigate('/')
  }  

  const inputHandler = (e) =>{
setval({...val,[e.target.name] : e.target.value });

  }
  useEffect(()=>{
console.log(user);

  },[user])


  
  return (
    <div className='w-full min-h-screen flex flex-col gap-7 sm:gap-3 py-3 items-center  sm:justify-center justify-start  sm:py-2 relative overflow-hidden' >
      <div className='head text-4xl pt-6 text-blue-500 sm:text-3xl font-extrabold'>
   Login Here!
      </div>

      <div className=' px-6 py-10  w-full max-w-md   bg-white/50 backdrop-blur-md shadow-md rounded-md'>
        <form onSubmit={handleSubmit} className='space-y-6 w-full'>

         
           <div className='flex flex-col gap-1  '>
            <span className='text-md sm:text-sm  font-bold'>Email address</span>
            <div className='relative '>
              <UserPlus size={20} className='absolute left-2 top-3'/>
              <input type="text" name='email' placeholder='johndoe' onChange={inputHandler}className=' w-full border pl-10 pr-3 py-2  rounded-md  border-gray-400 ' />
            </div>
          </div>
           <div className='flex flex-col gap-1  '>
            <span className='text-xl sm:text-sm  font-bold'>Password</span>
            <div className='relative '>
              <UserPlus size={20} className='absolute left-2 top-3'/>
              <input type="text" name='password' placeholder='johndoe' onChange={inputHandler} className=' w-full border pl-10 pr-3 py-2  rounded-md  border-gray-400 ' />
            </div>
          </div>
         
<button type='submit' disabled={loading} className='w-full  bg-red-700 rounded-md flex justify-center py-2 px-3  items-center font-semibold text-xl' >
  {loading ? (
                <>
                  <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                  Loading...
                </>
              ) : (
                <>
                  <User className='mr-2 h-5 w-5' aria-hidden='true' />
                Login
                </>
              )}
</button>

        </form>
      </div>
  <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1 text-gray-800 hover:text-blue-600"
            >
          new user? Click here
            </Link>
    </div>
  )
}

export default Login
