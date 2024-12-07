
import { setLogout } from '../store/userSlice';
import { useDispatch, useSelector} from 'react-redux';
import { isRouteErrorResponse, useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import AddCourses from '../components/AddCourses';
import MyCourse from '../components/MyCourse';
import WishList from '../components/WishList';
import Setting from '../components/Setting';
import EnrolledCourses from '../components/EnrolledCourses';
import ForgotPassword from './ForgotPassword';
import { useState } from 'react';
import Cookies from 'js-cookie'
import toast from 'react-hot-toast';
import { HiOutlineUser, HiOutlineHeart, HiOutlineCog } from 'react-icons/hi';
import { RiDashboardLine } from 'react-icons/ri';
import { HiOutlineLogout } from 'react-icons/hi';
// import { toast } from 'react-toastify';
const DashBoard = () => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const [currentComponent , setCurrentComponent] = useState("profile")

    const [myComponents , setMyComponents] = useState(
      [
        {myCourses : <MyCourse />},
        {profile : <Profile />},
        {wishList : <WishList />},
        {setting : <Setting />},
        {enrolledCourses : <EnrolledCourses />},
        {addCourses : <AddCourses />},
        {forgetPassword : <ForgotPassword />}
      ]
    )

    const { role } = useSelector((state) => state.user.data);
    

    const handleLogout = () => {
      Cookies.remove('accessToken');
      toast.success("Logout Successfully"); 
      localStorage.removeItem("persist:root");  
      dispatch(setLogout(null));
      navigate("/login");
    };


  return (
    <div className='w-full h-auto flex gap-13'>
      <div className='sidebar w-[230px] fixed top h-screen  text-black bg-white border-r-1 shadow-md border-gray-300'>
        <ul className='flex flex-col items-center justify-center gap-2 mt-20'>
          <li
            className={`p-2 w-full text-center hover:bg-gray-100 cursor-pointer ${
              currentComponent === "profile"
                ? "bg-gray-50 border-r-4 rounded-sm border-green-400"
                : ""
            }`}
            onClick={() => setCurrentComponent("profile")}
          >
            <HiOutlineUser className='inline-block mr-2' />
            My Profile
          </li>
          {role !== "instructor" && (
            <li
              className={`p-2 w-full  hover:bg-gray-100 text-center  cursor-pointer ${
                currentComponent === "wishList"
                  ? "bg-gray-50 border-r-4 border-green-400"
                  : ""
              }`}
              onClick={() => setCurrentComponent("wishList")}
            >
              <HiOutlineHeart className='inline-block mr-2' />
              My Course List{" "}
            </li>
          )}
          {/* <li
            className={`p-2 w-full text-center hover:bg-gray-100 cursor-pointer ${
              currentComponent === "enrolledCourses"
                ? "bg-gray-50 border-r-2 border-orange-400"
                : ""
            }`}
            onClick={() => setCurrentComponent("enrolledCourses")}
          >
            <RiDashboardLine className='inline-block mr-2' />
            Courses
          </li> */}
          {role !== "student" && (
            <>
              <li
                className={`p-2 w-full text-center hover:bg-gray-100  cursor-pointer ${
                  currentComponent === "myCourses"
                    ? "bg-gray-50 border-r-4 border-green-400"
                    : ""
                }`}
                onClick={() => setCurrentComponent("myCourses")}
              >
                <HiOutlineCog className='inline-block mr-2' />
                My Courses
              </li>
              <li
                className={`p-2 w-full text-center hover:bg-gray-100 cursor-pointer ${
                  currentComponent === "addCourses"
                    ? "bg-gray-50 border-r-4 border-green-400"
                    : ""
                }`}
                onClick={() => setCurrentComponent("addCourses")}
              >
                <HiOutlineLogout className='inline-block mr-2' />
                Add Course
              </li>
            </>
          )}
        </ul>
        <hr className='border- border-gray-300 mt-5 ' />
        <ul className='flex flex-col items-center justify-center mt-3 gap-2'>
          <li
            className={`p-2 w-full text-center hover:bg-gray-100 cursor-pointer ${
              currentComponent === "setting"
                ? "bg-gray-50  border-green-400 border-r-4"
                : ""
            }`}
            onClick={() => setCurrentComponent("setting")}
          >
            <HiOutlineCog className='inline-block mr-2' />
            Setting
          </li>

          <li
            className={`p-2 w-full text-center hover:bg-gray-100 cursor-pointer ${
              currentComponent === "forgetPassword"
                ? "bg-gray-50  border-green-400 border-r-4"
                : ""
            }`}
            onClick={() => setCurrentComponent("forgetPassword")}
          >
            <HiOutlineCog className='inline-block mr-2' />
            Forget Password
          </li>

          <li
            className='p-2 w-full text-center hover:bg-gray-100 cursor-pointer'
            onClick={handleLogout}
          >
            <HiOutlineLogout className='inline-block mr-2' />
            Logout
          </li>
        </ul>
      </div>

      <div
        className='w-[calc(100%-300px)] ml-[300px] mt-10'
        key={Math.random() * 100}
      >
        {myComponents.map((item) => {
          if (item[currentComponent]) {
            return item[currentComponent];
          }
        })}
      </div>
    </div>
  );
}

export default DashBoard


