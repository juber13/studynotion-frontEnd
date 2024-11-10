import axios from 'axios';
import React, { useState } from 'react'
import { Form } from 'react-router-dom';
import { setLoading } from '../store/userSlice';

import { useSelector , useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import {UPLOAD_COURSES} from '../../utils/restEndPoints'; 
import axiosInstance from '../../utils/axiosInstance';

const AddCourses = () => {
  const {loading} = useSelector(state => state.user);
  const dispatch = useDispatch();


  const [courseDetails , setCourseDetails] = useState({courseName : "" , coursePrice : "" , courseDuration : "" ,thumbnail : ""  , video : "" })

  const handleChange = (e) => {
     const {name , value } = e.target;
     setCourseDetails({...courseDetails , [name] : value})
  }


 const handleFileChange = (e) => {
  const { name, files } = e.target;

  // Check if files are selected
  if (files.length > 0) {
    const file = files[0];
    console.log(file);  
    setCourseDetails(prevDetails => ({
      ...prevDetails,
      [name]: file // Dynamically set the thumbnail or video based on input name
    }));
  }
};

  const uploadCourse = async(e) => {
    e.preventDefault();

    try{
      dispatch(setLoading(true));
      const formData = new FormData(); 
      
      for(let key in courseDetails){
        formData.append(key , courseDetails[key])
      }

      const res = await axiosInstance.post(UPLOAD_COURSES, formData);
      toast.success("Course Uploaded Successfully")
      
      for(let key in courseDetails){
        setCourseDetails({...courseDetails , [key] : ""})
      } 
      console.log(res)
      dispatch(setLoading(false));

    }catch(err){
      console.log(err)
      toast.error(err.response.data.error)
      dispatch(setLoading(false));
    }

  }


  return (
    <div className='mt-10 px-6'>
      <h2 className='text-3xl text-slate-700 font-bold mb-3 '> Upload Your Course</h2>
      <div className='max-w-5xl mx-auto mt-3 border border-slate-200 p-12 rounded-xl shadow-lg bg-white'>
        <form className='grid grid-cols-2 gap-6' onSubmit={uploadCourse}>
          <input
            type='text'
            placeholder='Course Title'
            name='courseName'
            className='border border-slate-300 outline-none p-3 rounded-lg focus:ring-2 focus:ring-slate-400 transition-all'
            onChange={handleChange}
            value={courseDetails.courseName}
          />
          <input
            type='text'
            placeholder='Course Price'
            name='coursePrice'
            className='border border-slate-300 outline-none p-3 rounded-lg focus:ring-2 focus:ring-slate-400 transition-all'
            onChange={handleChange}
            value={courseDetails.coursePrice}
          />
          <input
            type='text'
            placeholder='Course Duration'
            name='courseDuration'
            className='border border-slate-300 outline-none p-3 rounded-lg focus:ring-2 focus:ring-slate-400 transition-all'
            onChange={handleChange}
            value={courseDetails.courseDuration}
          />

           <div className='flex items-center border border-slate-300 rounded-lg p-2 hover:border-slate-400 transition-all'>
            <label className='flex items-center cursor-pointer bg-slate-600 text-white px-6 py-2.5 text-sm rounded-lg hover:bg-slate-700 transition-all'>
              <input
                type='file'
                className='hidden'
                name='thumbnail'
                onChange={(e) => {
                  handleFileChange(e)
                  const fileName = e.target.files[0]?.name || 'No file chosen'
                  document.getElementById('image-file').textContent = fileName
                }}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Choose Image
            </label>
            <span className='ml-4 text-gray-600' id='image-file'>
              No file chosen
            </span>
          </div>

          <div className='flex items-center border border-slate-300 rounded-lg p-2 hover:border-slate-400 transition-all'>
            <label className='flex items-center cursor-pointer bg-slate-600 text-white px-6 py-2.5 text-sm rounded-lg hover:bg-slate-700 transition-all'>
              <input
                type='file'
                className='hidden'
                name='video'
                onChange={(e) => {
                  handleFileChange(e)
                  const fileName = e.target.files[0]?.name || 'No file chosen'
                  document.getElementById('video-file').textContent = fileName
                }}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Choose Video
            </label>
            <span className='ml-4 text-gray-600' id='video-file'>
              No file chosen
            </span>
          </div>
          
          <textarea
            className='border border-slate-300 col-span-2 row-span-2 p-4 rounded-lg focus:ring-2 focus:ring-slate-400 transition-all min-h-[150px] resize-none'
            name='description'
            placeholder='Course Description'
            onChange={handleChange}
          ></textarea>

          <button
            type='submit'
            className={`bg-green-500 hover:bg-green-600 w-[200px] p-3 rounded-lg text-sm font-bold text-white shadow-md transition-all transform hover:scale-[1.02] ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </div>
            ) : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddCourses