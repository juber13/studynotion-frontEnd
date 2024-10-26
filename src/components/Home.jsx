import { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs'
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import MyCourse from './MyCourse';
import { HiChevronDown } from 'react-icons/hi';
import { setLoading } from '../store/userSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Card from './Card';
import { GET_ALL_COURSES } from "../../utils/restEndPoints";
import axiosInstance from '../../utils/axiosInstance';
import Loader from './Loader';


const Home = () => {
  // const token = Cookies.get('token');
  // console.log(token); 
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch()
  //  const {loading} = useSelector((state) => state.user);
   const { loading } = useSelector((state) => state.user);

  console.log(loading)

    const getAllCourses = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axiosInstance.get(GET_ALL_COURSES);
        console.log(res.data.data);
        setCourses(res.data.data);
        dispatch(setLoading(false));
      } catch (err) {
        console.log(err);
        dispatch(setLoading(false));
      }
    };

    useEffect(() => {
      getAllCourses();
    }, []);

  return (
    <div className='main-section flex flex-col items-center justify-center w-full h-auto bg-gradient-to-b from-white to-gray-100'>
      <div className='hero-section gap-8 flex flex-col mt-20 items-center justify-center max-w-3xl m-auto h-screen px-4'>
        <button className='flex items-center border-2 border-green-500 gap-2 rounded-lg shadow-lg p-3 hover:bg-green-500 hover:text-white transition-all duration-300 font-semibold'>
          Become a instructor
          <span>
            <BsArrowRight className='mt-1 text-lg animate-pulse' /> 
          </span>
        </button>
        <h3 className='text-5xl font-bold text-center bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent'>Empower Your Future with Coding Skills</h3>
        <p className='text-xl text-center font-[300] text-gray-600 leading-relaxed'>
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </p>

        <div className='btn flex gap-4'>
          <a
            href=''
            className='p-4 border-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-lg text-white font-semibold text-base transition-all duration-300 hover:transform hover:scale-105'
          >
            Learn More
          </a>
          <a
            href=''
            className='p-4 border-2 bg-black hover:bg-gray-800 text-white rounded-lg shadow-lg text-base transition-all duration-300 hover:transform hover:scale-105'
          >
            Book Demo
          </a>
        </div>

        {/* <div className='text-5xl mt-20 border-2 border-green-300 rounded-full shadow-xl p-2 animate-bounce cursor-pointer hover:border-green-500 transition-all duration-300'>
          <HiChevronDown className='text-green-500' />
        </div> */}
      </div>
      <div className='my-course mt-10 mb-10 w-[90%] max-w-7xl'>
        <h3 className='text-3xl font-bold text-center text-slate-700 mb-8'>Trending Courses</h3>
        <div className='flex flex-wrap items-start justify-center gap-6  '> 
          {loading && <Loader/>}
          {courses?.map((course) => <Card key={course._id} course={course} />)} 
        </div>
      </div>
    </div>
  );
}

export default Home