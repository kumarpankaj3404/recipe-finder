import React from 'react'
import { Link } from 'react-router-dom';
import { BiDish } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";

const Navigation = () => {
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
        <Link to="/fav" className='flex items-center gap-2 hover:text-orange-400 transition-colors group'>
          <p>Favorites</p>
          <AiOutlineHeart className='h-5 w-5 group-hover:scale-125 transition-transform' />
        </Link>
      </div>
    </div>
  )
}

export default Navigation