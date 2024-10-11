import axios from 'axios';
import React, { useState } from 'react'
import { Form } from 'react-router-dom';
import { setLoading } from '../store/userSlice';

import { useSelector , useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
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
    setCourseDetails(prevDetails => ({
      ...prevDetails,
      [name]: file // Dynamically set the thumbnail or video based on input name
    }));
  }
};

  const handleVideoUpload = async(e) => {
    e.preventDefault();

    try{
      dispatch(setLoading(true));
      const formData = new FormData();
      for(let key in courseDetails){
        formData.append(key , courseDetails[key])
      }
      const res = await axios.post(`http://localhost:5050/api/course/uploadCourse`, formData);
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
    <div className='mt-20'>
      <h2 className='text-2xl text-slate-500 font-semibold '> Upload Course</h2>
      <div className='max-w-5xl mt-10 border p-10'>
        <form className='grid grid-cols-2 gap-4' onSubmit={handleVideoUpload}>
          <input
            type='text'
            placeholder='Course Title'
            name='courseName'
            className='border outline-none p-2 rounded-md'
            onChange={handleChange}
            value={courseDetails.courseName}
          />
          <input
            type='text'
            placeholder='Course Price'
            name='coursePrice'
            className='border outline-none p-2 rounded-md'
            onChange={handleChange}
            value={courseDetails.coursePrice}
          />
          <input
            type='text'
            placeholder='Course Duration'
            name='courseDuration'
            className='border outline-none p-2 rounded-md'
            onChange={handleChange}
            value={courseDetails.courseDuration}
          />

          {/* <input
            type='file'
            placeholder='Course-image'
            name='thumbnail'
            className='border outline-none p-2 rounded-md'
            onChange={handleFileChange}
          /> */}

           <div className='flex items-center border rounded-md'>
            <label className='flex items-center cursor-pointer bg-slate-500 text-white px-4 p-2 text-sm rounded-md hover:bg-slate-700'>
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
              Choose Image
            </label>
            <span className='ml-4 text-gray-700' id='image-file'>
              No file chosen

            </span>
          </div>

          <div className='flex items-center border rounded-md'>
            <label className='flex items-center cursor-pointer bg-slate-500 text-white px-4 p-2 text-sm rounded-md hover:bg-slate-700'>
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
              Choose Video
            </label>
            <span className='ml-4 text-gray-700' id='video-file'>
              No file chosen
            </span>
          </div>
          
          <textarea
            className='border col-span-2 row-span-2 p-2'
            name='description'
            id=''
            placeholder='course description'
            onChange={handleChange}
          ></textarea>

          <button
            type='submit'
            className={`bg-green-400 p-2 rounded-md text-sm shadow-sm font-bold text-white ${
              loading ? "opacity-50 cursor-not-allowed animation-spin" : ""
            }`}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddCourses