import React, { useState } from 'react'

import toast from "react-hot-toast";
import { setLoading , setUser } from "../store/userSlice";
import { useDispatch , useSelector} from 'react-redux';
import axios from "axios";
import { FaEdit } from 'react-icons/fa';
import axiosInstance from '../../utils/axiosInstance';
import { UPDATE_USER_PROFILE } from '../../utils/restEndPoints';
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

    const handleFileChange = (e) => {
      const {name , files } = e.target;
      setUpdatedInfo({ ...updatedInfo, [name]: files[0] });
    } 

  return (
    <>
      {isEditMode ? (
        <div className='edit-from mt-20 border p-5 flex-start max-w-5xl'>
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
                  Profile Image
              <div className='flex items-center border rounded-md'>
                <label className='flex items-center cursor-pointer bg-slate-500 text-white px-4 p-2 text-sm placeholder:text-xs rounded-md hover:bg-slate-700'>
                  <input
                    type='file'
                    className='hidden'
                    name='imageUrl'
                    onChange={(e) => {
                      handleFileChange(e);
                      const fileName = e.target.files[0]?.name || "No file chosen";
                        document.getElementById("image-file").textContent =fileName;
                    }}
                  />
                  Choose image
                </label>
                <span className='ml-4 text-gray-700' id='image-file'>
                  No file chosen
                </span>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='lastName'>Name</label>
              <input
                type='text'
                placeholder='Name'
                name='name'
                className='p-1 border rounded-md placeholder:text-sm outline-none '
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
                className='p-1 border rounded-md placeholder:text-sm outline-none '
                value={updatedInfo.lastName}
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='phone'>Phone Number</label>
              <input
                type='text'
                placeholder='phoneNumber'
                name='phoneNumber'
                className='p-1 border rounded-md placeholder:text-sm outline-none '
                value={updatedInfo.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div>
            <button
              className='border p-2 flex flex-start mt-3 text-sm rounded-md bg-green-500 text-white font-semibold'
              type='submit'
            >
             {loading ? "Updating..." : "Update"}  
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
                <h2>Email : {email} </h2>
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