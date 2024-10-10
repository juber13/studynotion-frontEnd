import React from 'react'

const ForgotPassword = () => {
  return (
    <div className='main-section w-full height flex items-center justify-center'>
      <div className='about-section flex gap-6 flex-col max-w-xl m-auto'>
        <h3 className='text-2xl'>Reset Password</h3>
        <p className='text-lg font-[300]'>
          Have no fear. We’ll email you instructions to reset your password. If
          you dont have access to your email we can try account recovery
        </p>

        <div className='form-container flex gap-3'>
           <form className='flex gap-3 flex-col w-[50%]'>
             <label htmlFor="email">Email Address</label>
             <input type="text" placeholder='Enter your email address'  className='border w-full rounded-md p-2 outline-none text-sm'/>
             <button className='p-2 text-white font-semibold text-sm rounded-md bg-yellow-500'>Reset Password</button>
           </form>
         </div>
      </div>
    </div>
  );
}

export default ForgotPassword