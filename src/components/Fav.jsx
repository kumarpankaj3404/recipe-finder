import React , {useEffect, useState} from 'react'
import useFetch from '../hooks/useFetch';


const  Fav = () => {
    const [changed, setchanged] = useState(false);

        const {data,errror} = useFetch(`http://localhost:8000/fav?reload=${changed}`);
        if (errror) {
        return <div>Error: {errror}</div>;
        }
        const dataRender = data || [];
        console.log("Fetched data:", dataRender);

    const handleRemove = (id) =>{
        fetch(`http://localhost:8000/fav/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            // Optionally, you can update the UI or state after deletion
            console.log(`Recipe with id ${id} deleted successfully.`);
            setchanged(!changed); // Toggle the state to re-fetch data

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
  return (

    <div className='flex-col justify-center items-center w-screen mt-20 min-h-screen'>
        <h1 className='text-3xl text-center font-bold '>All your Fav Dish</h1>
        <div className=' bg-gray-100 flex justify-center items-center'>
            <div className='grid grid-cols-3 gap-16 '>

            {dataRender.map((food)=>(
            <div key={food.id} className="border-2 p-7 m-6 border-black w-40 rounded-2xl flex flex-col items-center hover:scale-110 " >
                <button className='relative top-0 left-14' id="like2" onClick={() => handleRemove(food.id)} >
                <img src="./images/f-heart.svg" alt="" className='h-5 w-5'/>
                </button>
                <div className=''>
                
                    <img src={food.image} alt="image" width={60} height={45} className='ml-5'/>
                
                <h1 className='text-xl font-bold mt-2 text-center'>{food.name}</h1>
                <p className='text-sm text-gray-600 text-center'>{food.description}</p>
                </div>
            </div>
            ))}

        </div>
        </div>
    </div>
    
  )
}

export default Fav