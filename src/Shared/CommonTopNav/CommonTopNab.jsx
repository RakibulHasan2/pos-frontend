import 'react'
import { useState } from 'react';
import { CiPower, CiSettings, CiUser } from 'react-icons/ci';
import useUser from '../getUser/GetUser';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { IoSunnyOutline } from 'react-icons/io5';
import { AiOutlineFullscreenExit } from 'react-icons/ai';
import toast from 'react-hot-toast';
import {  useNavigate } from 'react-router';

export default function CommonTopNab() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const user = useUser();
  const navigate = useNavigate();
  // Function to toggle the side menu
  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };
  const handleLogout = () => {
    // Clear user data from sessionStorage
    localStorage.removeItem('user');
    toast.success('Logged out successfully.')
    console.log('User logged out successfully.')

    alert('User logged out successfully.');
  navigate('/login');
  };

  return (
    <div className='w-full h-16 border flex items-center justify-end gap-5 pr-5'>

      <button className='flex items-center  px-2 py-2 rounded-xl transition-all duration-300 hover:bg-blue-100'>
        <AiOutlineFullscreenExit className='text-2xl' />
      </button>
      <button className='flex items-center  px-2 py-2 rounded-xl transition-all duration-300 hover:bg-blue-100'>
        <IoSunnyOutline className='text-2xl' />
      </button>
      <button className='flex items-center  px-2 py-2 rounded-xl transition-all duration-300 hover:bg-blue-100' onClick={toggleSideMenu}>
        <CiUser className='text-2xl' />  {user?.role} <MdOutlineArrowDropDown />
      </button>


      {/* side  menu bar start*/}
      <div
        className={`fixed border top-0 right-0 h-[100vh] border-l border-[#696969] w-[85%] md:w-[300px] bg-white transition-transform duration-500 ease-in-out transform ${isSideMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ zIndex: 1000 }}
      >
        {/* Close Button */}
        <div className="border border-[#f7f7f7] h-16 bg-[#f7f7f7]">

          <button
            onClick={toggleSideMenu}
            className="absolute text-4xl text-red top-3 right-5 hover:text-red-600"
          >
            &times;
          </button>
        </div>

        {/* Side Menu Content */}
        <div>
          <button className='flex items-center hover:text-blue-600 transition-all duration-300 h-16 border-b w-full pl-5'>
            <CiUser className='text-2xl' /> My Profile
          </button>
          <button className='flex items-center hover:text-blue-600 transition-all duration-300 h-16 border-b w-full pl-5'>
            <CiSettings className='text-2xl' /> Settings
          </button>
          <button onClick={handleLogout} className='flex items-center hover:text-red-600 transition-all duration-300 h-16 border-b w-full pl-5'>
            <CiPower className='text-2xl' /> Logout
          </button>
        </div>
      </div>
      {/* side  menu bar end*/}
    </div>
  )
}
