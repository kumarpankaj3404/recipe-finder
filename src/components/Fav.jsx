import React from 'react'
import useFetch from '../hooks/useFetch';

const  Fav = () => {

    const {data,errror} = useFetch('http://localhost:8000/fav');
    if (errror) {
        return <div>Error: {errror}</div>;
    }
    const dataRender = data || [];
  return (
    <div>
        <div className='grid grid-cols-5'>

        {dataRender.map((food)=>(
          <div key={food.id} className="border-2 p-7 m-6 border-black w-40 rounded-2xl flex flex-col items-center hover:scale-110 " >
            <button className='relative top-0 left-12' id="like2" > {/*onClick={() => handleLike(food.id)}-*/}
              <img src="./images/f-heart.svg" alt="" className='h-5 w-5'/>
            </button>
            <div>
              <img src={food.image} alt="image" width={60} height={45}/>
              <h1 className='text-xl font-bold mt-2 text-center'>{food.name}</h1>
              <p className='text-sm text-gray-600 text-center'>{food.description}</p>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Fav