import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { setLoading } from '../store/userSlice'
import { SIGN_IN } from '../../utils/restEndPoints'
import axiosInstance from '../../utils/axiosInstance'
axios.defaults.withCredentials = true;

const SignUp = () => {
  const [userInfo , setUserInfo] = useState({name : "" , lastName : "" , imageUrl : "", email : "" , password : "" , phoneNumber : "" , confirmPassword : "" , role : ""});
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);

  

  const handleChange = (e) => {
    const {name , value} = e.target;
    setUserInfo({...userInfo , [name] : value});
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    console.log(files)

    // Check if files are selected
    if (files.length > 0) {
      const file = files[0];
      console.log(file);
      setUserInfo((prevDetails) => ({
        ...prevDetails,
        [name]: file, 
      }));
    }
  };
  
  const handleSignUp = async(e) => {
    e.preventDefault();
    try{
      const formData = new FormData();
      for(let key in userInfo){
        formData.append(key , userInfo[key]);
      } 
      dispatch(setLoading(true));
      const res = await axiosInstance.post(SIGN_IN, formData);
      // formData.forEach(key => formData[key] = "");
      // setUserInfo({ ...userInfo, [key]: "" });
      for (let key in userInfo) {
        setUserInfo({ ...userInfo, [key]: "" });
      } 

      toast.success(res.data.message)
      dispatch(setLoading(false));
      navigate('/login'); 
    }catch(err){
      toast.error(err.response.data.error , { style : {fontSize : "12px" }, duration : 1000 });
      console.log(err); 
    }finally{
      dispatch(setLoading(false));
    }
  }


  return (
    <div className='w-full border shadow-md max-w-xl m-auto mt-20 p-10'>
      <div className='signup-section max-w-6xl m-auto'>
        <div className='left'>
          <div className='heading flex gap-4 flex-col'>
            <h2 className='text-2xl'>Register</h2>
          </div>

          <form className='flex flex-col gap-3' onSubmit={handleSignUp}>
            <div className='role flex gap-2 mt-3'>
              <input
                type='radio'
                className='bg-white border p-1 rounded-md text-sm cursor-pointer'
                name='role'
                value='student'
                onChange={handleChange}
              />
              Student
              <input
                type='radio'
                className='bg-white border p-1 rounded-md text-sm cursor-pointer'
                name='role'
                value='instructor'
                onChange={handleChange}
              />
              Instructor
            </div>

            <div className='flex gap-3 w-full'>
              <div className='flex flex-col flex-1'>
                <label htmlFor='name' className='text-sm font-semibold'>
                  First Name <span className='text-red'>*</span>
                </label>
                <input
                  name='name'
                  className='border rounded-md p-3 outline-none text-sm'
                  type='text'
                  placeholder='Enter First Name'
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col flex-1'>
                <label htmlFor='Email' className='text-sm font-semibold'>
                  Last Name <span className='text-red'>*</span>
                </label>
                <input
                  name='lastName'
                  className='border rounded-md p-3 outline-none text-sm '
                  type='text'
                  placeholder='Enter Last Name'
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='flex gap-3'>
              <div className='flex flex-col flex-1'>
                <label htmlFor='Email' className='text-sm font-semibold'>
                  Email Address <span className='text-red'>*</span>
                </label>
                <input
                  name='email'
                  className='border rounded-md p-3 outline-none text-sm'
                  type='text'
                  placeholder='Enter Email'
                  onChange={handleChange}
                />
              </div>

              <div className='flex flex-col flex-1'>
                <label htmlFor='phone' className='text-sm font-semibold'>
                  Phone Number <span className='text-red'>*</span>
                </label>
                <input
                  name='phoneNumber'
                  className='border rounded-md p-3 outline-none text-sm'
                  type='text'
                  placeholder='Phone code '
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='flex gap-3'>
              <div className='flex flex-col flex-1'>
                <label htmlFor='password' className='text-sm font-semibold'>
                  Enter Password <span className='text-red'>*</span>
                </label>
                <input
                  name='password'
                  className='border rounded-md p-3 outline-none text-sm'
                  type='password'
                  placeholder='Enter Password'
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col flex-1'>
                <label
                  htmlFor='confirm-password'
                  className='text-sm font-semibold'
                >
                  Confirm Password <span className='text-red'>*</span>
                </label>
                <input
                  name='confirmPassword'
                  className='border rounded-md p-3 outline-none text-sm'
                  type='password'
                  placeholder='Confirm Password'
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='flex gap-3 flex-col'>
              <label htmlFor='lastName'>Profile Picture</label>
              <input
                type='file'
                placeholder='image'
                name='imageUrl'
                className='p-1 border rounded-md'
                onChange={handleFileChange}
              />
            </div>

            <div className='flex gap-3 mt-4'>
              <button
                className={`p-2 rounded-md text-xs bg-green-500 text-white font-semibold ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                type='submit'
              >
                {loading ? "Signing.." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp