import React, { useState } from 'react'

const WishList = () => {
   const [data , setData] = useState(0);
  return (
      <div className='edit-from mt-20 p-5 flex-start'>
          {data.length > 0  ? 
            <div className='heading flex items-center  gap-10 w-full flex-wrap'>
            <div className='w-[300px] h-[300px] border rounded-md shadow-md bg-gray-100 flex flex-col'>
               <div className='heading'>
                  <button className="border text-xs  rounded-md">Remove From WishList</button>
               </div>
               video {1 * 1}
            </div>
            <div className='w-[300px] h-[300px] border rounded-md shadow-md bg-gray-100 flex flex-col'>
               <div className='heading'>
                  <button className="border text-xs  rounded-md">Remove From WishList</button>
               </div>
               video {1 * 1}
            </div>
            <div className='w-[300px] h-[300px] border rounded-md shadow-md bg-gray-100 flex flex-col'>
               <div className='heading'>
                  <button className="border text-xs  rounded-md">Remove From WishList</button>
               </div>
               video {1 * 1}
            </div>
            <div className='w-[300px] h-[300px] border rounded-md shadow-md bg-gray-100 flex flex-col'>
               <div className='heading'>
                  <button className="border text-xs  rounded-md">Remove From WishList</button>
               </div>
               video {1 * 1}
            </div>
            <div className='w-[300px] h-[300px] border rounded-md shadow-md bg-gray-100 flex flex-col'>
               <div className='heading'>
                  <button className="border text-xs  rounded-md">Remove From WishList</button>
               </div>
               video {1 * 1}
            </div>
          </div>
           :
              <div className='flex flex-col items-center gap-2 height justify-center'>
               <h3 className='font-semibold text-2xl'>You haven't enrolled any Course Yet</h3>
               <p>Please choose to start your web journey</p>
              </div>
            }

        </div>
     )
}

export default WishList