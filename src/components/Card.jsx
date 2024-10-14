/* eslint-disable react/prop-types */
import React from 'react'

const Card = ({course}) => { 

  console.log(course)

  return (
    <div
      key={course._id}
      className='w-[250px] border-green-200 border-2 overflow-hidden flex flex-col h-[320px] p-2 items-center gap-2  rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105'
    >
      <div className=''>
        <img
          src={course.thumbnail}
          alt={course.courseName}
          className=' rounded-t-lg h-[100px] w-full object-contain'
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

      <button className='bg-green-500 w-[90%] text-white p-2 text-sm rounded-b-lg hover:bg-green-600 transition duration-200'>
        Buy Now
      </button>
    </div>
  );
}

export default Card