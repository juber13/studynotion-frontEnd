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
    <div className='w-full h-screen flex items-center justify-center'>
      {loading && <Loader />}
      <div className='w-[80%] h-full flex items-center justify-center'>
         <Card course={course}/>
      </div>
    </div>
  );
}

export default CourseDetail