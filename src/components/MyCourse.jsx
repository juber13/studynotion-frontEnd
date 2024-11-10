import React, { useEffect ,useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { setLoading , setIsupdated } from '../store/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { GET_INSTRUCTOR_COURSES , MAKE_COURSE_PUBLISHED } from '../../utils/restEndPoints';



const MyCourse = () => {
  const [courses , setCourses] = useState([]);
  const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);

  
  // get all courses which are published by instructo r
  const getInstructorCourses = async() => {
    try{
       dispatch(setLoading(true));
      const res = await axiosInstance.get(GET_INSTRUCTOR_COURSES, {
        headers: {
          "Content-Type": "application/json",
          withCredentials:true
        },
      }); 
      setCourses(res.data.data)
      dispatch(setLoading(false));
    }catch(err){
      console.log(err)
      dispatch(setLoading(false));
    }
  } 

  useEffect(() => {
     getInstructorCourses();
  },[])


  // make a api call to published the courses
  const makeCoursePublished = async(courseId) => {
    try{
      dispatch(setLoading(true));
      await axiosInstance.patch(`${MAKE_COURSE_PUBLISHED}/${courseId}` , {withCredentials : true})

      getInstructorCourses();
      toast.success("Course Published Successfully");
      dispatch(setIsupdated(true));
      dispatch(setLoading(false));  
      }catch(err){
      console.log(err)
      dispatch(setLoading(false));
    }
  }

  return (
    <div className='flex flex-wrap flex-col gap-10 justify-center items-center mt-10 pb-12'>
      {courses.length > 0 && <h3 className='text-3xl font-bold text-gray-800 mb-6'>My Courses</h3>}
      <div className='flex w-[90%] gap-3 items-center justify-center'>
        {loading && <h2 className='text-lg font-semibold text-blue-600 animate-pulse'>Loading Courses...</h2>}
        {courses.length === 0 ? (
          <div className='text-center text-slate-600 font-semibold text-3xl flex flex-col items-center justify-center w-full min-h-[300px] bg-gray-50 rounded-lg shadow-sm'>
            <svg className="w-20 h-20 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            No Courses Found!
          </div>
        ) : (
          <div className='w-full overflow-hidden rounded-lg shadow-lg'>
            <table className='w-full bg-white border'>
              <thead>
                <tr className='text-center bg-gray-100 '>
                  <th className='font-semibold p-4 border text-gray-700'>Course Name</th>
                  <th className='font-semibold p-4 border text-gray-700'>Price</th>
                  <th className='font-semibold p-4 border text-gray-700'>Description</th>
                  <th className='font-semibold p-4 border text-gray-700'>Duration</th>
                  <th className='font-semibold p-4 border text-gray-700'>Status</th>
                </tr>
              </thead>
              <tbody>
                {courses?.map((course, index) => (
                  <tr key={course._id} className={`border-b hover:bg-gray-50 transition-colors duration-200 ${index % 2 !== 0 ? 'bg-gray-50' : ''}`}>
                    <td className='p-4 font-medium text-gray-800'>{course.courseName}</td>
                    <td className='p-4 text-gray-700 border'>${course.coursePrice}</td>
                    <td className='p-4 text-gray-700 border'>{course.description}</td>
                    <td className='p-4 text-gray-700 border'>{course.courseDuration}</td>
                    <td className='p-4'>
                      {course.isPublished ? 
                        <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800'>
                          Published
                        </span> :
                        <button 
                          onClick={() => makeCoursePublished(course._id)} 
                          className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        >
                          Make Published
                        </button>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>  );
}

export default MyCourse