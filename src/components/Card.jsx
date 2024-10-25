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
      className='bg-white shadow-lg rounded-lg pt-6 overflow-hidden transition-transform transform hover:scale-105 duration-300 w-full max-w-[250px] mx-auto'
    >
      <div className='relative'>
        <img
          src={course.thumbnail}
          alt={course.courseName}
          className='w-[80%] m-auto bg-cover h-[120px] object-cover rounded-t-lg transition-transform duration-300'
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x200?text=Course+Image";
          }}
        />
        <div className=' bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-300 to-transparent'>
          <h3 className='text-black font-bold text-lg'>{course.courseName}</h3>
        </div>
      </div>

      <div className='p-4'>
        <div className='flex justify-between items-center'>
          <span className='text-xl font-semibold text-indigo-600'>
            ₹{course.coursePrice}
          </span>
          <span className='text-sm text-gray-500'>{course.courseDuration}</span>
        </div>

        <div className='flex items-center gap-2 text-gray-600 mt-2'>
          <span className='material-icons text-sm text-indigo-500'>Instructor</span>
          <span className='text-sm truncate'>{course.createdBy}</span>
        </div>

        <button className='mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
          Enroll Now
        </button>
      </div>
    </div>
  );
}
export default Card