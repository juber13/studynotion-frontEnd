/* eslint-disable react/prop-types */
import React from 'react'

const Input = ({type , placeholder , name , value , onChange}) => { 
  return (
     <div className='flex flex-col gap-2'> 
       <label htmlFor={name} className='text-sm font-[500]'>{name} <span className='text-red-400'>*</span></label>
       <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} className='border rounded-lg p-4   outline-none text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 hover:border-green-400' />   
     </div>
  )
}

export default Input