import React, { useEffect ,useState } from 'react'

import { useDispatch } from 'react-redux';
import { setLoading } from '../store/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';


const MyCourse = () => {
  const [courses , setCourses] = useState([]);
  const dispatch = useDispatch();
  
  // get all courses which are published by instructor
  const getInstructorCourses = async() => {
    try{
       dispatch(setLoading(true));
      const res = await axios.get(`http://localhost:5050/api/course/getInstructorCourse`); 
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
      await axios.patch(`http://localhost:5050/api/course/makeCoursePublished/${courseId}`);
      getInstructorCourses();
      toast.success("Course Published Successfully")
      dispatch(setLoading(false));  
      }catch(err){
      console.log(err)
      dispatch(setLoading(false));
    }
  }

  return (
    <div className='flex flex-wrap flex-col gap-10 justify-center items-center mt-10 pb-12'>
      {courses.length > 0 && <h3>My Courses</h3>}
      <div className='flex w-[90%] gap-3'>
        {courses.length === 0 ? (
          <div className='text-center text-slate-300 text-3xl flex items-center justify-center w-full height'>
            No Courses Found
          </div>
        ) : (
          <table className='w-full'>
            <thead>
              <tr className='text-center font-[300] border'>
                <th className='font-[400] p-2 border'>Course Name</th>
                <th className='font-[400] p-2 border'>Price</th>
                <th className='font-[400] p-2 border'>Description</th>
                <th className='font-[400] p-2 border'>Duration</th>
                <th className='font-[400] p-2 border'>IsPublished</th>
              </tr>
            </thead>
            <tbody >
              {courses?.map((course , index) => (
                <tr key={course._id} className={`border text-center font-sm p-3 ${index % 2 !== 0 ? 'bg-slate-50' : ''}`}>
                  <td className='border p-3 font-[300]'>{course.courseName}</td>
                  <td className='border p-3 font-[300]'>{course.coursePrice}</td>
                  <td className='border p-3 font-[300]'>{course.description}</td>
                  <td className='border p-3 font-[300]'>{course.courseDuration}</td>
                  <td className='border p-3 font-[300]'>
                  {course.isPublished ? 
                   <button className='border bg-green-400 rounded-md text-sm font-semibold px-2 py-1 text-white'>Published</button> :
                   <button onClick={() => makeCoursePublished(course._id)} className='border px-2 text-sm bg-slate-300 py-1 text-black rounded-lg font-semibold'>Make Published</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MyCourse