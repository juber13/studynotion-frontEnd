/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' 

const Card = ({course}) => { 
  const navigate = useNavigate();
  const [arr] = useState(Array.from({length: 5}).fill(0));
  const [rating, setRating] = useState(0);

  const handleStarValue = (value) => {
    setRating(value);
  }

  return (
    <div
      onClick={() => navigate(`/course/${course._id}`)}
      key={course._id}
      className='bg-white shadow-lg rounded-lg  cursor-pointer overflow-hidden transition-transform transform hover:scale-105 duration-300 w-full max-w-[250px]'
    >
      <div className='relative'>
        <img
          src={course.thumbnail}
          alt={course.courseName}
          className='w-full max-w-full bg-cover h-[150px] object-cover rounded-t-lg transition-transform duration-300'
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x200?text=Course+Image";
          }}
        />
        <div className='absolute hover:h-[150px] transition-transform duration-300 w-full bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent'>
          <h3 className='text-white font-bold text-lg'>{course.courseName}</h3>
        </div>
      </div>

      <div className='p-4'>
        <div className='flex items-center justify-between'>
          <span className='text-xl font-semibold text-indigo-600'>
            ₹{course.coursePrice}
          </span>

          <span className='text-sm text-gray-500'>
            {course.courseDuration}
          </span>
        </div>

        <div className='flex items-center gap-2 text-gray-600 mt-2'>
          <span className='material-icons text-sm text-indigo-500'>
            Instructor
          </span>
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