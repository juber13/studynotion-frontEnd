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


const Home = () => {
  // const token = Cookies.get('token');
  // console.log(token); 
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch()

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

  const userInfo = useSelector((state) => state.user);
  console.log(userInfo.user);
  console.log(Cookies.get('token'));
  return (
    <div className='main-section flex flex-col  items-center justify-center w-full h-auto'>
      <div className='hero-section gap-5 flex flex-col mt-20 items-center justify-center max-w-2xl m-auto h-screen'>
        <button className='flex items-center  border gap-2 rounded-md shadow-md p-2'>
          Become a instructor
          <span>
            <BsArrowRight className='mt-1 text-xs' />
          </span>
        </button>
        <h3 className='text-4xl'>Empower Your Future with Coding Skills</h3>
        <p className='text-sm text-center'>
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </p>

        <div className='btn flex gap-3'>
          <a
            href=''
            className='p-3 border bg-green-500 rounded-md shadow-md text-white font-semibold text-sm'
          >
            Learn More
          </a>
          <a
            href=''
            className='p-3 border bg-black text-white rounded-md shadow-md text-sm'
          >
            Book demo
          </a>
        </div>

        <div className='text-4xl mt-20 border border-green-200 rounded-full shadow-inherit animate-bounce cursor-pointer'>
          <HiChevronDown className='' fill='green' />
        </div>
      </div>
      <div className='my-course mt-3 mb-10 w-[90%'>
        <h3 className='text-2xl font-semibold text-center text-slate-600'>Trending Courses</h3>
      <div className='flex items-center flex-wrap gap-3 mt-3 p-4'> 
          {courses?.map((course) => <Card key={course._id} course={course} />)}
        </div>
      </div>
    </div>
  );
}

export default Home