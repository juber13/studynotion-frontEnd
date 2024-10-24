/* eslint-disable react/prop-types */
import React from 'react'
import { useNavigate } from 'react-router-dom'  
const Card = ({course}) => { 
  const navigate = useNavigate()
  console.log(course)

  return (
    <div
      onClick={() => navigate(`/course/${course._id}`)}
      key={course._id}
      className='w-[250px] border-slate-200 border-2 overflow-hidden flex flex-col h-[320px] p-2  items-center gap-2  rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105'
    >
      <div className=''>
        <img
          src={course.thumbnail}
          alt={course.courseName}
          className=' rounded-t-lg h-[90px] w-full object-contain'
        />
      </div>

      <div className='flex flex-col items-start p-4'>
        <p className='text-lg font-bold text-gray-800 truncate'>
          Course: {course.courseName}
        </p>
        <p className='text-md font-semibold text-green-600'>
          Price: {course.coursePrice}
        </p>
        <p className='text-sm text-gray-600'>
          Duration: {course.courseDuration}
        </p>
        <p className='text-sm text-gray-600 truncate'>
          Instructor: {course.createdBy}
        </p>
        <p className='text-sm text-gray-600'>Ratings : {(Math.random() * 4 + 1).toFixed(2)}</p>
        {/* <p className='text-sm text-gray-500 word-break w-full'>
          Description: {course.description}
        </p> */}
      </div>

      <button className='w-[90%] text-blue-600 font-semibold border p-2 text-sm  rounded-md bg-slate-100 transition duration-200'>
        Buy Now
      </button>
    </div>
  );
}

export default Card