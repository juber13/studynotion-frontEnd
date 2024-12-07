import React, { useState } from 'react'

import toast from "react-hot-toast";
import { setLoading , setUser } from "../store/userSlice";
import { useDispatch , useSelector} from 'react-redux';
import axios from "axios";
import { FaEdit } from 'react-icons/fa';
import axiosInstance from '../../utils/axiosInstance';
import { UPDATE_USER_PROFILE } from '../../utils/restEndPoints';
import { MdOutlineEditNote } from "react-icons/md";
import { MdEdit } from "react-icons/md";


axios.defaults.withCredentials = true;

import { Form } from 'react-router-dom';


const Profile = () => {
    const  user  = useSelector((state) => state.user.data);
    const { name, phoneNumber, isActive, email, role, lastName , imageUrl , loading,  } = user;
    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedInfo, setUpdatedInfo] = useState({
      name: "",
      phoneNumber: "",
      lastName: "",
      imageUrl: "",
    });


    const dispatch = useDispatch();

    const handleChange = (e) => {
      const { name, value } = e.target;
      setUpdatedInfo({ ...updatedInfo, [name]: value });
    };

    const handleFileChange = (e) => {
      const { name, files } = e.target;
      setUpdatedInfo({ ...updatedInfo, [name]: files[0] });
    }; 


    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        dispatch(setLoading(true));
        const formData  = new FormData();
        for(const key in updatedInfo) {
          formData.append(key, updatedInfo[key]);
        }
        const res = await axiosInstance.put(UPDATE_USER_PROFILE,
          {
            data: updatedInfo,
          }
        );
        console.log(res)
        dispatch(setUser(res.data.data));
        toast.success("Profile Updated Successfully");
        setIsEditMode(false); 
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
        dispatch(setLoading(false));
      }
    }; 

    
  return (
    <>
      {isEditMode ? (
        <div className='edit-from mt-20 border border-gray-200 rounded-lg shadow-lg p-8 flex-start max-w-5xl bg-white'>
          <div className='heading flex items-center justify-between w-full border-b pb-4'>
            <h2 className='text-3xl font-bold text-gray-800'>Edit Profile</h2>
            <div
              className='px-4 py-2 text-sm font-semibold bg-red-500 hover:bg-red-600 rounded-lg text-white cursor-pointer transition-colors duration-300 flex items-center gap-2'
              onClick={() => setIsEditMode(false)}
            >
              Cancel
            </div>
          </div>
          <form className='grid grid-cols-2 gap-6 mt-8' onSubmit={handleUpdate}>
            <div className='flex flex-col gap-3'>
              <h3 className='text-lg font-semibold text-gray-700'>
                Profile Image
              </h3>
              <div className='flex items-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors duration-300'>
                <label className='flex items-center cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-300'>
                  <input
                    type='file'
                    className='hidden'
                    name='imageUrl'
                    onChange={(e) => {
                      handleFileChange(e);
                      const fileName =
                        e.target.files[0]?.name || "No file chosen";
                        document.getElementById("image-file").textContent = fileName;
                    }}
                  />
                  Choose image
                </label>
                <span className='ml-4 text-gray-600' id='image-file'>
                  No file chosen
                </span>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='name' className='text-gray-700 font-medium'>
                Name
              </label>
              <input
                type='text'
                placeholder='Enter your name'
                name='name'
                className='p-3 border-2 rounded-lg placeholder:text-gray-400 outline-none focus:border-blue-500 transition-colors duration-300'
                value={updatedInfo.name}
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='lastName' className='text-gray-700 font-medium'>
                Last Name
              </label>
              <input
                type='text'
                placeholder='Enter your last name'
                name='lastName'
                className='p-3 border-2 rounded-lg placeholder:text-gray-400 outline-none focus:border-blue-500 transition-colors duration-300'
                value={updatedInfo.lastName}
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='phone' className='text-gray-700 font-medium'>
                Phone Number
              </label>
              <input
                type='text'
                placeholder='Enter your phone number'
                name='phoneNumber'
                className='p-3 border-2 rounded-lg placeholder:text-gray-400 outline-none focus:border-blue-500 transition-colors duration-300'
                value={updatedInfo.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                className='px-6 py-3 text-sm font-semibold rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors duration-300 flex items-center gap-2'
                type='submit'
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div
          className={`profile-section flex-1 text-black flex flex-col ${
            isEditMode && "hidden"
          }`}
        >
          <div className='container p-8 flex flex-col gap-8'>
            <h1 className='text-4xl font-bold text-gray-800 border-b pb-4'>
              My Profile
            </h1>

            <div
              className='relative w-fit group'
              onClick={() => setIsEditMode(true)}
            >
              <img
                src={imageUrl}
                alt='Profile'
                className='transition-all duration-300 border-4 shadow-xl border-green-200 rounded-full hover:border-green-300 size-32'
              />
              <div className='absolute inset-0 rounded-full cursor-pointer bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300'>
                <span className='text-white text-2xl'>
                  <FaEdit />
                </span>
              </div>
            </div>

            <div className='user-info flex justify-between items-center border-2 rounded-xl border-green-200 bg-white p-6 shadow-md hover:shadow-xl transition-shadow duration-300'>
              <div className='user-name space-y-3'>
                <h2 className='text-lg'>
                  <span className='font-semibold'>Full Name : </span>{" "}
                  <i className='text-gray-600'>
                     {name} {lastName}
                  </i>
                </h2>
                <h2 className='text-lg'>
                  <span className='font-semibold'>Email :</span>{" "}
                  <i className='text-gray-600'> {email}</i>
                </h2>
              </div>

              <button
                className='p-3 text-lg bg-white rounded-lg border-2 border-green-300 hover:bg-green-50 transition-colors duration-300'
                onClick={() => setIsEditMode(true)}
              >
                <MdEdit />
              </button>
            </div>

            <div className='about flex items-center justify-between border-2 rounded-xl border-green-200 bg-white p-6 shadow-md  hover:shadow-xl transition-shadow duration-300'>
              <div className='space-y-4'>
                <div>
                  <h2 className='text-lg'>
                    About :
                    <i className='text-gray-600 '>
                      {" "}
                       I'm a full stack developer
                    </i>
                  </h2>
                  <p className='text-gray-600'></p>
                </div>
                <div>
                  <h2 className='text-lg '>
                    Course Uploaded : <i className='text-gray-600'>{10}</i>
                  </h2>
                </div>
              </div>

              <button
                className='p-3 text-lg bg-white rounded-lg border-2 border-green-300 hover:bg-green-50 transition-colors duration-300'
                onClick={() => setIsEditMode(true)}
              >
                <MdEdit />
              </button>
            </div>

            <div className='personal-details flex items-center justify-between border-2 rounded-xl border-green-200 bg-white p-6  shadow-md hover:shadow-xl transition-shadow duration-300'>
              <div className='space-y-3'>
                <p className='text-lg'>
                  <span className='font-semibold'>Phone Number:</span>{" "}
                  <i className='text-gray-600'>{phoneNumber}</i>
                </p>
                <p className='text-lg'>
                  <span className='font-semibold'>Role:</span>{" "}
                  <i className='text-gray-600'>{role}</i>
                </p>
                <p className='text-lg'>
                  <span className='font-semibold'>Status:</span>{" "}
                  <i className='text-gray-600'>
                    {isActive ? "Active" : "Inactive"}
                  </i>
                </p>
              </div>
              <button
                className='p-3 text-lg bg-white rounded-lg border-2 border-green-300 hover:bg-green-50 transition-colors duration-300'
                onClick={() => setIsEditMode(true)}
              >
                <MdEdit />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile