import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { BiDish } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";

const Navigation = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // No Supabase Auth listener needed for custom table auth. 
  // State is persisted in localStorage via authSlice.

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div className='flex justify-between items-center h-20 px-8 text-white bg-neutral-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 shadow-lg'>
      <Link to="/" className="group">
        <div className='flex items-center gap-3'>
          <div className="bg-gradient-to-tr from-orange-500 to-amber-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
            <BiDish className='h-6 w-6 text-white' />
          </div>
          <h1 className='text-3xl font-extrabold bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent group-hover:to-orange-100 transition-all'>Recipe Finder</h1>
        </div>
      </Link>

      <div className='flex items-center gap-8 font-medium'>
        <Link to="/search" className='relative hover:text-orange-400 transition-colors duration-300 after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full'>Search</Link>
        <Link to="/Categories" className='relative hover:text-orange-400 transition-colors duration-300 after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full'>Categories</Link>
        {user && (
          <Link to="/fav" className='flex items-center gap-2 hover:text-orange-400 transition-colors group'>
            <p>Favorites</p>
            <AiOutlineHeart className='h-5 w-5 group-hover:scale-125 transition-transform' />
          </Link>
        )}


        {user ? (
          <div className='flex items-center gap-4 bg-white/5 py-1.5 px-4 rounded-full border border-white/10'>
            <span className='text-sm text-gray-300'>Hi, <span className="text-white font-bold">{user.email?.split('@')[0]}</span></span>
            <button
              onClick={handleLogout}
              className='bg-red-500/80 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-all hover:shadow-red-500/20 hover:shadow-lg'
            >
              Logout
            </button>
          </div>
        ) : (
          <div className='flex items-center gap-4'>
            <Link to="/login" className='hover:text-white/80 transition-colors'>Login</Link>
            <Link to="/signup" className='bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all'>Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navigation