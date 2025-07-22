import React, { useState } from 'react'
import Recipe from './Recipe'

const Serch = () => {
  const [keyword,setKeyword] = useState("");
  const handleSearch = (e) =>{
    e.preventDefault();
  }
  return (
    <div className='flex flex-col justify-center items-center w-screen mt-20' >
        <div>
            <h1 className='text-3xl text-center font-bold'>Recipe Finder</h1>
            <p>Search main ingredient below to display recipes</p>
        </div>
        <div >
            <form className='flex  items-center mt-20 gap-5 pl-15' onSubmit={handleSearch}>
                <input
                  type='text'
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className='border-2 border-gray-400 rounded-2xl h-14 w-80 p-7'
                  placeholder="e.g. Chicken, Egg"
                />
                {/* <button type='sumbit' className='hover:scale-110 ' ><img src='./images/search.svg' className='h-10'/></button> */}
            </form>
        </div>
        
        <Recipe search={keyword} />

    </div>
  )
}

export default Serch