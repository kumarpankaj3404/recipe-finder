import React from 'react'
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (

    <div className='flex justify-between items-center border-b-2  border-neutral-600 h-15 text-2xl font-bold p-2 text-white bg-black sticky top-0 z-50'>

      <div className='flex items-center gap-5 ml-10'>
        <img src='./images/recipe-svgrepo-com.svg' alt='recipe' className='h-8'/>
        <h1 className='text-4xl'>Recipe Finder</h1>
      </div>
    
      <div className='flex items-center gap-5 mr-10'>
        <Link to="/">
          <p>Home</p>
        </Link>
        
        <Link to="/fav" className='flex items-center gap-2'>
          <p>Fav</p>
          <img src="./images/w-heart.svg" alt="" className='h-5 w-5'/>
        </Link>
      </div>
      
    </div>
  )
}

export default Navigation