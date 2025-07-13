import React, { useContext } from 'react'
import {SIDE_MENU_DATA} from "../../utils/data"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import CharAvatar from '../cards/CharAvatar';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import toast from 'react-hot-toast';

const Sidemenu = ({activeMenu}) => {
  const {user, clearUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if(route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
    
  }
 
  const handleLogout = async () => {
  try {
    // 🔁 Call backend to clear cookie/session
    await axiosInstance.post(API_PATHS.AUTH.LOGOUT)
    localStorage.clear();
    clearUser();
    toast.success("Logged out successfully");
    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error.response?.data?.message || error.message);
    toast.error("Logout failed. Please try again.");
  }
};

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
    <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-2'>
      {user?.avatar ? (
        <img 
        src={user.avatar}
        alt="Profile Image"
        className='w-20 h-20 bg-slate-400 rounded-full'
        />) : <CharAvatar
        fullName={user?.fullName}
        width="w-20"
        height="h-20"
        style="text-xl"
        />}
      <h5 className='text-gray-950 font-medium leading-6'>
        {user?.fullName || ""}
      </h5>
    </div>

    {SIDE_MENU_DATA.map((item, index) => (
      <button 
      key={`menu_${index}`}
      className={`w-full flex items-center gap-4 text-[15px] ${
        activeMenu == item.label ? "text-white bg-primary" : ""
      } py-3 px-6 rounded-lg mb-3`}
      onClick={() => handleClick(item.path)}>
        <item.icon className="text-xl" />
        {item.label}
      </button>
    ))}
    </div>

  )
}

export default Sidemenu
