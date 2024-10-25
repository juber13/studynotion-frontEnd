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
import Input from '../components/Input';
import LoginImage from '../assets/flat-design-illustration-web-developers_23-2148817995.avif'

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
       Cookies.set("accessToken" , res.data.data.accessToken);  
       dispatch(setUser(res.data.data._doc));
       toast.success('Login Successfully');
       setUserInfo({email: '',password: ''});

       dispatch(setLoading(false));
       navigate('/');
     }catch(error){
       console.log(error);  
      //  toast.error(error, { style : {fontSize : "12px" }, duration : 1000 });
       dispatch(setLoading(false));
     }
  };


  return (
    <div className='right border shadow-md flex rounded-md text-xs w-full  items-center h-screen'>
      {/* <div className=''>
        <h2 className='text-2xl font-semibold hover:text-green-500 transition-colors duration-300'>
          Login
        </h2>
      </div> */}

      <div className='flex-1 items-center'>
        <div className='max-w-md mx-auto flex flex-col gap-6'>
          <Input
            type="text"
            placeholder="Email"
            value={userInfo.email}
            name="Email"
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
          <Input
            type={isToggle ? "text" : "password"}
            placeholder={"Password"}
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
            name={"Password"}
          />

          <div className='grid grid-cols-1 gap-3'>
            <div className='w-full flex gap-2 justify-end'>
              <Link
                to='/signup'
                className='underline text-blue-400 hover:text-green-500 transition-colors duration-300'
              >
                New user
              </Link>
              <Link
                to='/forgot-password'
                className='underline text-blue-400 hover:text-green-500 transition-colors duration-300'
              >
                Forgot Password
              </Link>
            </div>
            <button
              className='bg-green-500 p-3 rounded-md text-white font-semibold shadow-lg text-lg hover:bg-green-600 transform hover:scale-[1.02] transition-all duration-300'
              onClick={handleLogin}
            >
              {loading ? "logging..." : "Login"}
            </button>
          </div>
        </div>
      </div>

      <div className='border-l-2 flex-1 flex items-center justify-center'>
        <img src={LoginImage} alt='' className='size-80 object-cover' />
      </div>
    </div>
  );}

export default Login