import React, { useState , useEffect} from 'react'
import axios from 'axios'


const Recipe = (props) => {
  const [recipe,setRecipe]= useState([]);
  const [liked, setLiked] = useState({});

  const recipes = [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Classic Italian pizza with tomato, mozzarella, and basil.',
      image: './images/pizza.svg'
    },
    {
      id: 2,
      name: 'Veggie Burger',
      description: 'A delicious burger with a plant-based patty and fresh veggies.',
      image: './images/burger.svg'
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan.',
      image: './images/salad.svg'
    },
    {
      id: 4,
      name: 'Pasta Alfredo',
      description: 'Creamy Alfredo sauce tossed with fettuccine pasta and herbs.',
      image: './images/pasta.svg'
    },
    {
      id: 5,
      name: 'Chocolate Cake',
      description: 'Rich and moist chocolate cake topped with chocolate ganache.',
      image: './images/cake.svg'
    }
  ]
  function handleLike(id){
    setLiked((prev) =>({
      ...prev,
      [id] : !prev[id]
    }));
  };

  useEffect(() => {
  axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${props.search}`)
    .then((res) => {
      if (res.data.meals) {
        setRecipe(res.data.meals);  // ✅ Save the response
      } else {
        setRecipe([]);  // No meals found
      }
    })
    .catch(err => {
      console.error("API error:", err);
    });
  }, [props.search]);

  const dataRender = props.search && recipe.length>0 ? recipe: recipes;

  return (
    <>
      <div className='grid grid-cols-5'>

        {dataRender.map((food)=>(
          <div key={food.idMeal || food.id} className="border-2 p-7 m-6 border-black w-40 rounded-2xl flex flex-col items-center hover:scale-110 " >
            <button className='relative top-0 left-12' id="like2" onClick={() => handleLike(food.id ||food.idMeal)}>
              <img src={liked[food.id || food.idMeal] ?"./images/f-heart.svg":"./images/b-heart.svg"} alt="" className='h-5 w-5'/>
            </button>
            <a href={food.strYoutube || ""} target='blank'>
              <img src={food.image || food.strMealThumb} alt="image" width={60} height={45}/>
              <h1 className='text-xl font-bold mt-2 text-center'>{food.name || food.strMeal}</h1>
              <p className='text-sm text-gray-600 text-center'>{food.strArea ? `${food.strArea} • ${food.strCategory}` : food.description}</p>
            </a>
          </div>
        ))}

      </div>

    </>
  )
}

export default Recipe