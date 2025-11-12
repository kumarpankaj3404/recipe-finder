
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Categories = () => {
    const [categories,setCategories] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then((res) => {
            setCategories(res.data.categories);
            setLoading(false);
        })
        .catch(err => {
            console.error("API error:", err);
        });
        
    },[]);

    const filteredCategories = (categories.filter((cat)=>(
        cat.strCategory != "Miscellaneous" && cat.strCategory != "Beef" 
    )));
    
  return (
    <div className='flex flex-col justify-center items-center w-screen  mt-20' >
        {(loading && <p className='text-4xl font-extrabold mt-40 mb-96'>Loading...</p>) || (
            <>
                <div>
                    <h1 className='text-3xl text-center font-bold'>Categories</h1>
                    <p>Explore recipes by categories</p>
                </div>
                <div className='mt-20'>
                    <div className='grid grid-cols-2 '>
                        {filteredCategories.map((food)=>(
                            <div key={food.idCategory} className=" text-gray-300 hover:text-gray-600 relative border-2 p-7 m-6 w-[600px] border-gray-300  rounded-2xl flex flex-col items-center hover:scale-110 transition duration-300" >
                                    <img src={food.strCategoryThumb} alt="image" width={300} height={250}/>
                                    <h1 className='text-2xl font-bold mt-2 text-center text-black'>{food.strCategory}</h1>
                                <p className='text-lg  text-center overflow-x-scroll h-28 p-5'>{food.strCategoryDescription}</p>
                            </div>
                        ))}
                    </div>
                </div>  
            </>
        )}
           
    </div>
  )
}

export default Categories