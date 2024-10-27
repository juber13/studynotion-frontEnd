import React, { useState } from 'react'


import { FORGOT_PASSWORD , VERIFY_OTP , UPDATE_PASSWORD } from '../../utils/restEndPoints';
import { setLoading } from '../store/userSlice';
import { useDispatch , useSelector } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
const ForgotPassword = () => {
  const [email , setEmail] = useState("");
  const [otp , setOtp] = useState("");
  const [isOtpSent , setIsOtpSent] = useState(false);
  const [isOtpVerified , setIsOtpVerified] = useState(false);
  const [password , setPassword] = useState("");  
  const [confirmPassword , setConfirmPassword] = useState("");  

   const dispatch = useDispatch();
   const  {loading}  = useSelector(store => store.user);

   console.log(loading)
  
  const resetPassword = async(e) => {
    e.preventDefault();
     try {
        dispatch(setLoading(true));
        const res = await axiosInstance.post(FORGOT_PASSWORD , email);
        console.log(res)
        setIsOtpSent(res.data.success);
        toast.success("Password reset link sent");
        dispatch(setLoading(false));
     } catch (error) {
       console.log(error)
        dispatch(setLoading(false));
     }
  } 

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.post(VERIFY_OTP, {otp});
      setIsOtpSent(false);
      setIsOtpVerified(res.data.success);
      toast.success("OTP verified");
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  }; 

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.post(UPDATE_PASSWORD, {password, confirmPassword});
      setIsOtpSent(false);
      setIsOtpVerified(res.data.success);
      toast.success("Password updated");
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };


  return (
    <div className='main-section w-full height flex items-center justify-center'>
      <div className='about-section flex gap-6 flex-col max-w-xl m-auto'>
        <h3 className='text-2xl'>Reset Password</h3>
        <p className='text-lg font-[300]'>
          Have no fear. We’ll email you instructions to reset your password. If
          you dont have access to your email we can try account recovery
        </p>

        <div className='form-container flex gap-3'>
          <form
            className={`flex gap-3 flex-col w-[50%] ${(isOtpSent || isOtpVerified ) && "hidden"}`}
            onSubmit={resetPassword}
          >
            <label htmlFor='email'>Email Address</label>
            <input
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              placeholder='Enter your email address'
              className='border w-full rounded-md p-2 outline-none text-sm'
            />
            <button
              type='submit'
              className={`p-2 text-white font-semibold text-sm rounded-md bg-yellow-500 ${
                loading ? "cursor-not-allowed opacity-0.5" : ""
              }`}
            >
              {loading ? "sending..." : "Reset Password"}
            </button>
          </form>

          {isOtpSent && (
            <div className='flex flex-col gap-3'>
              <label htmlFor='otp'>Enter OTP sent your mail</label>
              <input
                name='otp'
                type='text'
                placeholder='Enter your otp'
                className='border w-full rounded-md p-2 outline-none text-sm'
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={verifyOtp}
                className={`p-2 text-white font-semibold text-sm rounded-md bg-yellow-500 ${
                  loading ? "cursor-not-allowed opacity-0.5" : ""
                }`}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          )}

          {isOtpVerified && (
            <div className='flex flex-col gap-3'>
              <label htmlFor='password'>Enter New Password</label>
              <input
                name='password'
                type='password'
                placeholder='Enter your otp'
                className='border w-full rounded-md p-2 outline-none text-sm'
                onChange={(e) => setPassword(e.target.value)}
              />

              <label htmlFor='confirm_password'>Confirm Password</label>
              <input
                name='confirm_password'
                type='confirm_password'
                placeholder='Enter your otp'
                className='border w-full rounded-md p-2 outline-none text-sm'
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                onClick={updatePassword}
                className={`p-2 text-white font-semibold text-sm rounded-md bg-yellow-500 ${
                  loading ? "cursor-not-allowed opacity-0.5" : ""
                }`}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword