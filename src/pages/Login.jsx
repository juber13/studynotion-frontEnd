import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setToken , setLoading } from '../store/userSlice';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axiosInstance from '../../utils/axiosInstance';
import { LOG_IN } from '../../utils/restEndPoints';
const Login = () => {
  const [userInfo, setUserInfo] = useState({email: '',password: ''});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isToggle , setIsToggle] = useState(false); 
  const {loading}  = useSelector((state) => state.user);
  console.log(loading);
  
  const handleLogin = async() => {
     try{
       dispatch(setLoading(true));
       const res = await axiosInstance.post(LOG_IN,userInfo);

       Cookies.set("token" , res.data.data.token);  
       dispatch(setUser(res.data.data._doc));
       toast.success('Login Successfully');
       setUserInfo({email: '',password: ''});
       dispatch(setLoading(false));
       navigate('/');
     }catch(error){
       console.log(error);  
       toast.error(error.response.data.error, { style : {fontSize : "12px" }, duration : 1000 });
     }
  };


  return (
    <div className='right border shadow-md flex  flex-col gap-6 p-8 rounded-md text-xs max-w-sm m-auto mt-40'>
      <div className=''>
        <h2 className='text-2xl font-bold'>Login</h2>
      </div>
      <div className=''>
        <input
          type='text'
          className='rounded-md outline-none p-4 placeholder:text-lg border text-sm w-full'
          placeholder='Email'
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          value={userInfo.email}
        />
      </div>

      <div className='flex items-center justify-between border rounded-md p-2'>
        <input
          type={isToggle ? "text" : "password"}
          className='rounded-md outline-none p-2 flex-1 text-sm placeholder:text-lg'
          placeholder='Password'
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
          value={userInfo.password}
        />
        {isToggle ? (
          <AiOutlineEyeInvisible
            className='text-xl cursor-pointer'
            onClick={() => setIsToggle(!isToggle)}
          />
        ) : (
          <AiOutlineEye
            className='text-xl cursor-pointer'
            onClick={() => setIsToggle(!isToggle)}
          />
        )}
      </div>
      <div className='grid grid-cols-1 gap-3'>
        <div className='w-full flex justify-between'>
          <Link to='/singup' className='font-bold text-blue-400  text-right'>
            New user
          </Link>
          <Link
            to='/forgot-password'
            className='font-bold text-blue-400 text-right'
          >
            Forgot Password
          </Link>
        </div>
        <button
          className='bg-green-500 p-2 rounded-md text-white font-semibold shadow-lg text-sm'
          onClick={handleLogin}
        >
          {loading ? "logging..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login