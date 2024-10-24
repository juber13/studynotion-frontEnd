import React, { useEffect, useState } from "react";
import { BiCaretDown } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../store/userSlice";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get("accessToken"); 
  console.log(token)

  
  return (
    <div className='border p-3 fixed w-full z-10 top-0 flex items-center justify-between bg-gray-100'>
      <div className='logo cursor-pointer' onClick={() => navigate("/")}>
        <img
          src='data:image/png;base64,...' // Your base64 image
          alt=''
        />
      </div>

      <div className='menu-center flex gap-4 text-black-500 font-[400]'>
        <Link to='/'>
          <span className='text-green-400 hover:text-green-600'>Home</span>
        </Link>
        <div
          className='flex items-center relative cursor-pointer hover:text-green-600'
          onClick={() => setToggle(!toggle)}
        >
          Category
          <BiCaretDown />
          <ul
            className={`absolute top-10 bg-white-600 border shadow-md rounded-sm p-3 ${ toggle ? "block" : "hidden"}`}
          >
            <Link to='/'>
              <li className='hover:text-green-500 font-[300] text-sm'>FrontEnd</li>
            </Link>
            <Link to='/about'>
              <li className='hover:text-green-500 font-[300] text-sm'>Backend</li>
            </Link>
            <Link to='/contact'>
              <li className='hover:text-green-500 font-[300] text-sm'>Data Science</li>
            </Link>
          </ul>
        </div>
        <Link to='/about' className="hover:text-green-600">About us</Link>
        <Link to='/contact' className="hover:text-green-600">Contact us</Link>
        <Link to='#courses' className="hover:text-green-600">Courses</Link>
      </div>

      {!token ? (
        <div className='flex gap-3'>
          <Link
            to='/login'
            className='py-2 px-4 border-2 shadow-sm font-medium bg-white text-xs rounded-sm'
          >
            Login
          </Link>
          <Link
            to='/signup'
            className='py-2 px-4 border-2 shadow-sm bg-white text-xs rounded-sm font-semibold'
          >
            Create Account
          </Link>
        </div>
      ) : (
        <button
          onClick={() => navigate("/dashboard")}
          className='p-2 shadow-sm bg-green-500 rounded-md text-white text-sm font-semibold hover:bg-green-700'
        >
          DashBoard
        </button>
      )}
    </div>
  );
};

export default Header;
