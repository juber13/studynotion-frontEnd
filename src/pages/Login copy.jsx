import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='right border shadow-md flex flex-col gap-6 p-8 rounded-md text-xs max-w-sm m-auto mt-10'>
          <div className=''>
            <h2 className='text-2xl font-bold'>Login</h2>
          </div>
          <div className=''>
            <input
              type='text'
              className='rounded-md outline-none p-2 border text-sm w-full'
              placeholder='Email'
            />
          </div>

          <div className='grid grid-cols-1'>
            <input
              type='password'
              className='rounded-md outline-none p-2 border text-sm'
              placeholder='Password'
            />
          </div>
          <div className='grid grid-cols-1 gap-3'>
             <Link to="/forgot-password" className='font-bold text-blue-400 underline'>Forgot Password</Link>
             <Link to="/signup" className='font-bold text-blue-400 underline'>New user</Link>
            <button className='bg-yellow-500 p-2 rounded-md text-white font-semibold shadow-lg'>Login</button>
          </div>

        </div>
  )
}

export default Login