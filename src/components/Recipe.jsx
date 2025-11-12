import React, { useState , useEffect} from 'react'
import axios from 'axios'
import useFetch from '../hooks/useFetch';


const Recipe = (props) => {
  const [recipe,setRecipe]= useState([]);
  const [liked, setLiked] = useState([]);
  const [changed, setChanged] = useState(false);
  const [searchType, setSearchType] = useState(`s=${props.search}`);

  const recipes = [
    {
      id: '1',
      name: 'Margherita Pizza',
      description: 'Classic Italian pizza with tomato, mozzarella, and basil.',
      image: './images/pizza.svg'
    },
    {
      id: '2',
      name: 'Veggie Burger',
      description: 'A delicious burger with a plant-based patty and fresh veggies.',
      image: './images/burger.svg'
    },
    {
      id: '3',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan.',
      image: './images/salad.svg'
    },
    {
      id: '4',
      name: 'Pasta Alfredo',
      description: 'Creamy Alfredo sauce tossed with fettuccine pasta and herbs.',
      image: './images/pasta.svg'
    },
    {
      id: '5',
      name: 'Chocolate Cake',
      description: 'Rich and moist chocolate cake topped with chocolate ganache.',
      image: './images/cake.svg'
    }
  ]

  const{data,error} = useFetch(`http://localhost:8000/fav?reload=${changed}`);
  useEffect(() => {
    if(data){
    const idLiked = data.map((items) => items.id);
    console.log("Liked IDs:", idLiked);
    setLiked(idLiked);
  }
  }, [data]);

  function handleLike(id,name, description, image) {
    setChanged(!changed); 
    if(!liked.includes(id)) {
      fetch('http://localhost:8000/fav', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, name, description, image }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }else{
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
        console.log(`Recipe with id ${id} deleted successfully.`);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      }
      );
    }


  };

  useEffect(() => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${props.search}`)
    .then((res) => {
      if (res.data.meals) {
        setRecipe(res.data.meals); 
        console.log(Recipe);
        console.log("API response:", res.data.meals);
      } else {
        setRecipe([]);
      }
    })
    .catch(err => {
      console.error("API error:", err);
    });
  }, [props.search]);

  const dataRender = props.search && recipe.length>0 ? recipe: recipes;

  return (
    <div className='min-h-svh'>
      <div className='grid grid-cols-4 '>

        {dataRender.map((food)=>(
          <div key={food.idMeal || food.id} className=" relative border-2 p-7 m-6 border-gray-300 w-72 rounded-2xl flex flex-col items-center hover:scale-110 " >
            <button className='absolute top-2 right-2' id="like2" onClick={() => handleLike(food.id ||food.idMeal, food.name || food.strMeal, food.strArea ? `${food.strArea} • ${food.strCategory}` : food.description , food.image || food.strMealThumb)}>
              <img src={liked.includes(food.id || food.idMeal) ?"./images/f-heart.svg":"./images/b-heart.svg"} alt="" className='h-5 w-5'/>
            </button>
            <a href={food.strYoutube || ""} target='blank'>
              <img src={food.image || food.strMealThumb} alt="image" width={120} height={90}/>
            </a>
              <h1 className='text-xl font-bold mt-2 text-center'>{food.name || food.strMeal}</h1>
              <p className='text-sm text-gray-600 text-center'>{food.strArea ? `${food.strArea} • ${food.strCategory}` : food.description}</p>
          </div>
        ))}

      </div>

    </div>
  )
}

export default Recipe