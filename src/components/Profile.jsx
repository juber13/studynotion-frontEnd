import React, { useState } from 'react'

import toast from "react-hot-toast";
import { setLoading , setUser } from "../store/userSlice";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { FaEdit } from 'react-icons/fa';

axios.defaults.withCredentials = true;

import { useSelector } from 'react-redux';
import { Form } from 'react-router-dom';

const Profile = () => {
    const  user  = useSelector((state) => state.user.data);
    const { name, phoneNumber, isActive, email, role, lastName , imageUrl } = user;
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

    

    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const formData  = new FormData();
        for(const key in updatedInfo) {
          formData.append(key, updatedInfo[key]);
        }
        const res = await axios.put(`https://studynotion-backend-be2f.onrender.com/api/user/update`,
          {
            data: updatedInfo,
          }
        );
        console.log(res)
        dispatch(setUser(res.data.data));
        toast.success("Profile Updated Successfully");
        setIsEditMode(false); 
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error);
      }
    }; 

    const handleFileChange = (e) => {
      const {name , files } = e.target;
      setUpdatedInfo({ ...updatedInfo, [name]: files[0] });
    } 

  return (
    <>
      {isEditMode ? (
        <div className='edit-from mt-20 border p-5 flex-start'>
          <div className='heading flex items-center justify-between w-full'>
            <h2 className='text-2xl ml-3 font-semibold'>Edit Profile</h2>
            <div
              className='border p-2 text-sm font-semibold bg-orange-400 rounded-md text-white cursor-pointer'
              onClick={() => setIsEditMode(false)}
            >
              Cancel
            </div>
          </div>
          <form
            className='grid grid-cols-2 gap-3 mt-10 p-3'
            onSubmit={handleUpdate}
          >
            <div className='flex flex-col gap-2'>
              <label htmlFor='lastName'>Profile Picture</label>
              <input
                type='file'
                placeholder='lastName'
                name='imageUrl'
                className='p-1 border rounded-md'
                onChange={handleFileChange}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='lastName'>Name</label>
              <input
                type='text'
                placeholder='lastName'
                name='name'
                className='p-1 border rounded-md'
                value={updatedInfo.name}
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='lastName'>LastName</label>
              <input
                type='text'
                placeholder='lastName'
                name='lastName'
                className='p-1 border rounded-md'
                value={updatedInfo.lastName}
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='phone'>Phone Number</label>
              <input
                type='text'
                placeholder='lastName'
                name='phoneNumber'
                className='p-1 border rounded-md'
                value={updatedInfo.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <button
              className='border p-2 mt-3 rounded-md bg-green-500 text-white font-semibold'
              type='submit'
            >
              Update Details
            </button>
          </form>
        </div>
      ) : (
        <div
          className={`profile-section flex-1 text-black flex flex-col ${
            isEditMode && "hidden"
          }`}
        >
          <div className='container p-8 flex flex-col gap-10'>
            <div className='heading text-3xl mt-3'>My Profile </div>

            <div className='relative w-fit' onClick={() => setIsEditMode(true)}>
              <img
                src={imageUrl}
                alt='Editable'
                className='transition-transform border-4  shadow-md border-green-100  rounded-full duration-300 ease-in-out transform hover:scale-105 size-20'
              />
              <div className='absolute inset-0 rounded-full cursor-pointer w-full left-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300'>
                <span className='text-white text-lg'>
                  <FaEdit />
                </span>
              </div>
            </div>

            <div className='user-info flex justify-between items-center border-2 rounded-md border-green-100 bg-gray-50 p-3'>
              <div className='user-name'>
                <h2>
                  FullName : {name} {lastName}
                </h2>
                <h2>Email : {email}</h2>
              </div>

              <button
                className='border p-2 text-sm bg-white rounded-md border-green-300 font-semibold'
                onClick={() => setIsEditMode(true)}
              >
                Edit
              </button>
            </div>
            <div className='about flex justify-between border-2  rounded-md border-green-100 items-center bg-gray-50 p-3'>
              <div className='about-heading'>
                <h3>About</h3>
                <p>I m full stack developer</p>
              </div>

              <button
                className='border p-2 text-sm bg-white rounded-md border-green-300 font-semibold'
                onClick={() => setIsEditMode(true)}
              >
                Edit
              </button>
            </div>
            <div className='personal details flex justify-between border-2  rounded-md border-green-100 items-center bg-gray-50 p-3'>
              <div className='personal-heading'>
                <p>PhoneNumber : {phoneNumber}</p>
                <p>Role : {role}</p>
                <p>IsActive : {isActive.toString()}</p>
              </div>
              <button
                className='border p-2 text-sm bg-white rounded-md border-green-300 font-semibold'
                onClick={() => setIsEditMode(true)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile