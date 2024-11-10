import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { setLoading } from '../store/userSlice'
import { SIGN_IN } from '../../utils/restEndPoints'
import axiosInstance from '../../utils/axiosInstance'
import Input from '../components/Input'
import LoginImage  from '../assets/flat-design-illustration-web-developers_23-2148817995.avif'
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
    <div className='w-full border shadow-md flex m-auto gap-3 mt-12 p-8 rounded-md'>
      <div className='signup-section flex-1 m-auto'>
        <div className='left'>
          <div className='heading flex gap-4 flex-col'>
            <h2 className='text-2xl text-center'>Register</h2>
          </div>

          <form className='flex flex-col gap-3 pl-8' onSubmit={handleSignUp}>
            <div className='role flex gap-4 mt-3'>
              {["student", "instructor"].map((role) => (
                <label
                  key={role}
                  className='flex items-center space-x-2 cursor-pointer'
                >
                  <input
                    type='radio'
                    className='form-radio h-4 w-4 text-green-500 transition duration-150 ease-in-out cursor-pointer'
                    name='role'
                    value={role}
                    checked={userInfo.role === role}
                    onChange={handleChange}
                  />
                  <span className='text-gray-700'>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </span>
                </label>
              ))}
            </div>

            <div className='grid grid-cols-2 gap-2'>
              <Input
                placeholder={"First Name"}
                name={"name"}
                value={userInfo.name}
                onChange={handleChange}
                type={"text"}
              />
              <Input
                placeholder={"Last Name"}
                name={"lastName"}
                value={userInfo.lastName}
                onChange={handleChange}
                type={"text"}
              />
            </div>

            <div className='grid grid-cols-2 gap-2'>
              <Input
                placeholder={"email "}
                name={"email"}
                value={userInfo.email}
                onChange={handleChange}
                type={"text"}
              />
              <Input
                placeholder={"Phone"}
                name={"phoneNumber"}
                value={userInfo.phone}
                onChange={handleChange}
                type={"text"}
              />
            </div>

            <div className='grid grid-cols-2 gap-2'>
              <Input
                type={"password"}
                placeholder={"password"}
                name={"password"}
                value={userInfo.password}
                onChange={handleChange}
              />
              <Input
                type={"password"}
                placeholder={"confirm password"}
                name={"confirmPassword"}
                value={userInfo.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className='flex gap-3 flex-col'>
              <label htmlFor='fileInput' className='text-sm font-semibold'>
                Profile Picture
              </label>
              <div className='relative'>
                <input
                  type='file'
                  placeholder='image'
                  name='imageUrl'
                  className='hidden'
                  id='fileInput'
                  onChange={handleFileChange}
                />
                <label
                  htmlFor='fileInput'
                  className='cursor-pointer flex items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-md hover:border-green-500 transition-colors duration-300'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-gray-500'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  <span className='text-sm text-gray-600'>
                    {userInfo.imageUrl
                      ? userInfo.imageUrl.name
                      : "Choose a profile picture"}
                  </span>
                </label>
              </div>
            </div>

            <div className='flex gap-3 mt-4'>
              <button
                className={`p-3 px-6 rounded-lg text-sm bg-green-500 text-white font-semibold hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                type='submit'
                disabled={loading}
              >
                {loading ? (
                  <span className='flex items-center gap-2'>
                    <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24'>
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                        fill='none'
                      />
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      />
                    </svg>
                    Signing Up
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='flex-1 flex items-center justify-center pr-4'>
        <img src={LoginImage} alt='' className='size-80 object-cover' />
      </div>
    </div>
  );
}

export default SignUp