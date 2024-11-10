import React from 'react'
import { BiMessage, BiPhone, BiHome } from "react-icons/bi";
const Contact = () => {
  return (
    <div className='main-container max-w-5xl m-auto mt-20 height'>
      <div className='contact-section gap-10 flex w-full'>
        <div className='left flex h-fit border flex-col gap-6 bg-white shadow-lg rounded-lg p-8 text-black hover:shadow-xl transition-shadow duration-300'>
          <div className='hover:transform hover:scale-105 transition-transform duration-300'>
            <h2 className='flex items-center gap-2 font-semibold text-xl text-green-600'>
              <BiMessage className="text-2xl" />
              Chat with us
            </h2>
            <p className='font-[300] mt-2 text-gray-600'>Our friendly team is here to help</p>
          </div>

          <div className='hover:transform hover:scale-105 transition-transform duration-300'>
            <h2 className='flex items-center gap-2 font-semibold text-xl text-green-600'>
              <BiHome className="text-2xl" />
              Visit us
            </h2>
            <p className='font-[300] mt-2 text-gray-600'>
              Come and say hello at our office HQ. Here is the location/ address
            </p>
          </div>

          <div className='hover:transform hover:scale-105 transition-transform duration-300'>
            <h2 className='flex items-center gap-2 font-semibold text-xl text-green-600'>
              <BiPhone className="text-2xl" />
              Call us
            </h2>
            <p className='font-[300] mt-2 text-gray-600'>
              Mon - Fri From 8am to 5pm. +123 456 7890
            </p>
          </div>
        </div>

        <div className='right border shadow-lg flex flex-col gap-6 p-10 rounded-lg text-sm bg-white hover:shadow-xl transition-shadow duration-300'>
          <div className=''>
            <h2 className='text-3xl font-bold text-gray-800 leading-tight'>Got an Idea? We've got the skills. Let's team up</h2>
            <p className='mt-4 text-gray-600'>Tell us more about yourself and what you've got in mind.</p>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <input
              type='text'
              className='rounded-lg outline-none p-3 border border-green-300 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300'
              placeholder='First Name'
            />
            <input
              type='text'
              className='rounded-lg outline-none border border-green-300 p-3 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300'
              placeholder='Last Name'
            />
          </div>

          <div className='grid grid-cols-1'>
            <input
              type='text'
              className='rounded-lg outline-none p-3 border border-green-300 text-sm focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300'
              placeholder='Email'
            />
          </div>

          <div className='flex gap-2'>
            <select name="" id="" className='border border-green-300 rounded-lg text-sm p-3 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300'>
             <option value="">+91</option>
             <option value="">+92</option>
             <option value="">+93</option>
             <option value="">+94</option>
             <option value="">+95</option>
             <option value="">+96</option>
            </select>
            <input
              type='text'
              className='outline-none p-3 border border-green-300 text-sm w-full rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300'
              placeholder='123456789'
            />
          </div>

          <div className='grid grid-cols-1'>
            <textarea 
              id='' 
              rows={5} 
              cols={10} 
              className='w-[100%] outline-none border border-green-300 p-3 rounded-lg focus:green-blue-500 focus:ring-2 focus:ring-green-200 transition-all duration-300'
              placeholder='Your message here...'
            ></textarea>
          </div>

          <button className='bg-green-600 p-3 rounded-lg text-white text-lg hover:bg-green-700 font-semibold shadow-lg transform hover:scale-105 transition-all duration-300'>Send Message</button>
        </div>
      </div>
    </div>  );
}

export default Contact