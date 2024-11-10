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

  
  return (
    <div className='border-b shadow-md p-4 fixed w-full z-10 top-0 flex items-center justify-between bg-white backdrop-blur-sm bg-opacity-90'>
      <div className='logo font-semibold text-slate-800 cursor-pointer transform hover:scale-105 transition-transform duration-200' onClick={() => navigate("/")}>
        Study Notion
      </div>

      <div className='menu-center flex gap-6 text-gray-700 font-[400]'>
        <Link to='/'>
          <span className='text-green-500 hover:text-green-600 transition-colors duration-200'>Home</span>
        </Link>
        <div
          className='flex items-center relative cursor-pointer hover:text-green-600 transition-colors duration-200'
          onClick={() => setToggle(!toggle)}
        >
          Category
          <BiCaretDown className="ml-1" />
          <ul
            className={`absolute top-12 bg-white border rounded-lg shadow-xl p-4 w-48 space-y-2 transform transition-all duration-200 ${
              toggle ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <Link to='/'>
              <li className='text-black hover:bg-gray-50 p-2 rounded-md transition-colors duration-200'>FrontEnd</li>
            </Link>
            <Link to='/about'>
              <li className='text-black hover:bg-gray-50 p-2 rounded-md transition-colors duration-200'>Backend</li>
            </Link>
            <Link to='/contact'>
              <li className='text-black hover:bg-gray-50 p-2 rounded-md transition-colors duration-200'>Data Science</li>
            </Link>
          </ul>
        </div>
        <Link to='/about' className="hover:text-green-600 transition-colors duration-200">About us</Link>
        <Link to='/contact' className="hover:text-green-600 transition-colors duration-200">Contact us</Link>
        <Link to='/instructors' className="hover:text-green-600 transition-colors duration-200">Instructors</Link>
      </div>

      {!token ? (
        <div className='flex gap-4'>
          <Link
            to='/login'
            className='py-2 px-6 border border-green-500 text-green-500 hover:bg-green-50 rounded-full transition-colors duration-200 text-sm font-medium'
          >
            Login
          </Link>
          <Link
            to='/signup'
            className='py-2 px-6 bg-green-500 text-white hover:bg-green-600 rounded-full transition-colors duration-200 text-sm font-medium'
          >
            Create Account
          </Link>
        </div>
      ) : (
        <button
          onClick={() => navigate("/dashboard")}
          className='px-6 py-2 bg-green-500 rounded-full text-white text-sm font-medium hover:bg-green-600 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg'
        >
          Dashboard
        </button>
      )}
    </div>
  );
};

export default Header;
