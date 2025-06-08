import React from 'react'

const Navigation = () => {
  return (

    <div className='flex justify-between items-center border-b-2  border-neutral-600 h-15 text-2xl font-bold p-2 text-white bg-black'>

      <div className='flex items-center gap-5 ml-10'>
        <img src='./images/recipe-svgrepo-com.svg' alt='recipe' className='h-8'/>
        <h1 className='text-4xl'>Recipe Finder</h1>
      </div>
    
      <div className='flex gap-5 mr-10'>
        <p>Home</p>
        <p>Fav</p>
      </div>
      
    </div>
  )
}

export default Navigation