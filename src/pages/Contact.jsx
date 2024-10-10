import React from 'react'
import { BiMessage, BiPhone, BiHome } from "react-icons/bi";
const Contact = () => {
  return (
    <div className='main-container  max-w-5xl m-auto mt-20 height'>
      <div className='contact-section gap-10 flex w-full'>
        <div className='left flex h-fit flex-col gap-6 bg-white shadow-md rounded-md p-6 text-black'>
          <div className=''>
            <h2 className='flex items-center gap-2 font-semibold'>
              <BiMessage />
              Chat with us
            </h2>
            <p className='font-[300]'>Our friendly team is here to help</p>
          </div>

          <div>
            <h2 className='flex items-center gap-2 font-semibold'>
              <BiHome />
              Visit us
            </h2>
            <p className='font-[300]'>
              come and say hello at our office HQ. Here is the location/ address
            </p>
          </div>

          <div>
            <h2 className='flex items-center gap-2 font-semibold'>
              <BiPhone />
              Call us
            </h2>
            <p className='font-[300]'>
              Mon - Fri From 8am to 5pm. +123 456 7890
            </p>
          </div>
        </div>

        <div className='right border shadow-md flex flex-col gap-6 p-8 rounded-md text-xs'>
          <div className=''>
            <h2 className='text-2xl font-bold'>Got a Idea? We've got the skills. <br></br>Let's team up</h2>
            <p className='mt-3'>Tall us more about yourself and what you're got in mind.</p>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <input
              type='text'
              className='rounded-md outline-none p-2 border text-sm'
              placeholder='First Name'
            />
            <input
              type='text'
              className='rounded-md outline-none border p-2 text-sm'
              placeholder='Last Name'
            />
          </div>

          <div className='grid grid-cols-1'>
            <input
              type='text'
              className='rounded-md outline-none p-2 border text-sm'
              placeholder='Email'
            />
          </div>

          <div className='flex gap-1'>
            {/* <input type='text' className='rounded-md p-2 border text-sm max-w-[60px]' placeholder='+91' /> */}
            <select name="" id="" className='border rounded-md text-xs'>
             <option value="">+91</option>
             <option value="">+92</option>
             <option value="">+93</option>
             <option value="">+94</option>
             <option value="">+95</option>
             <option value="">+96</option>
            </select>
            <input
              type='text'
              className='outline-none p-2 border text-sm w-full rounded-md'
              placeholder='123456789'
            />
          </div>

          <div className='grid grid-cols-1'>
            <textarea id='' rows={5} cols={10} className='w-[100%] outline-none border p-1'></textarea>
          </div>

          <button className='bg-green-500 p-2 rounded-md text-white text-lg hover:bg-green-600 font-semibold shadow-lg'>Send Message</button>
        </div>
      </div>
    </div>
  );
}

export default Contact