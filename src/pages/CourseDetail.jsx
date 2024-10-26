import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import { GET_COURSE_DETAILS } from '../../utils/restEndPoints';
import { setLoading } from '../store/userSlice';
import { useSelector , useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import Card from '../components/Card';
const CourseDetail = () => {
    
    const {id} = useParams();

    const [course , setCourse] = useState({});
    const {loading}  = useSelector(state => state.user);
    const dispatch = useDispatch();
    console.log(loading)


    const getCourseDetails = async() => {
        
        try{
          dispatch(setLoading(true));
          const res = await axiosInstance.get(`${GET_COURSE_DETAILS}/${id}`); 
          setCourse(res.data.data); 
          dispatch(setLoading(false));
          toast.success(res.data.message);
        }catch(err){
            console.log(err)
        } 
    }

    useEffect(() => {
        getCourseDetails();
    }, [])

  return (
    <div className={`w-full min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 ${loading ? 'mt-0' : 'mt-10'}`}>
      {loading && <Loader />}
      <div className='w-full px-4 py-12 md:px-8 lg:px-16'>
        <div className='max-w-6xl mx-auto'>
          <div className='bg-white rounded-2xl shadow-xl overflow-hidden'>
            <div className='p-8 lg:p-12'>
              <div className='flex flex-col lg:flex-row gap-12'>
                <div className='lg:w-2/3'>
                  <h1 className='text-5xl font-extrabold text-gray-900 mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'>
                    {course.title}
                  </h1>
                  <div className='aspect-video rounded-xl overflow-hidden mb-8 shadow-lg'>
                    <video src={course.video} controls className='w-full h-full object-cover'></video>
                  </div>
                  <p className='text-xl leading-relaxed text-gray-700 mb-8'>{course.description}</p>
                </div>
                <div className='lg:w-1/3'>
                  <div className='sticky top-8'>
                    <div className='bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 shadow-lg'>
                      <Card course={course} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  );
}

export default CourseDetail