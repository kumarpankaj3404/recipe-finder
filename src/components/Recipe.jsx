import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, fetchFavorites } from '../store/favoritesSlice';
import { AiFillHeart, AiOutlineHeart, AiOutlineClose } from "react-icons/ai";

const Recipe = (props) => {
  const [recipes, setRecipes] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.favorites.items);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);


  useEffect(() => {
    if (user?.id) {
      dispatch(fetchFavorites(user.id));
    }
  }, [dispatch, user]);

  const handleLike = (food) => {
    if (!user) {
      alert("Please login to save favorites!");
      return;
    }

    const recipeName = food.name || food.strMeal;
    // Check if liked by matching NAME since we don't have recipe_id in schema
    const isLiked = favorites.some((fav) => fav.name === recipeName);

    if (!isLiked) {
      const recipeData = {
        // recipe_id: recipeId, // Removed as per schema
        name: recipeName,
        description: food.strArea ? `${food.strArea} • ${food.strCategory}` : food.description,
        image: food.image || food.strMealThumb,
      };
      dispatch(addFavorite({ userId: user.id, recipe: recipeData }));
    } else {
      // Find the database ID of the favorite to remove based on Name
      const favoriteToRemove = favorites.find(fav => fav.name === recipeName);

      if (favoriteToRemove && favoriteToRemove.id) {
        dispatch(removeFavorite(favoriteToRemove.id));
      }
    }
  };

  const handleViewRecipe = async (id) => {
    setLoadingDetails(true);
    try {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      if (res.data.meals && res.data.meals.length > 0) {
        setSelectedRecipe(res.data.meals[0]);
      }
    } catch (error) {
      console.error("Error fetching details", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const promises = [];

        // Prepare API calls based on available filters
        if (props.keyword) {
          promises.push(axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${props.keyword}`));
        }
        if (props.category) {
          promises.push(axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${props.category}`));
        }
        if (props.area) {
          promises.push(axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${props.area}`));
        }

        if (promises.length === 0) {
          if (props.searchValue) {
            let url = '';
            if (props.searchType === 'category') url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${props.searchValue}`;
            else if (props.searchType === 'area') url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${props.searchValue}`;
            else url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${props.searchValue}`;

            const res = await axios.get(url);
            setRecipes(res.data.meals || []);
            return;
          }

          setRecipes([]);
          return;
        }

        const responses = await Promise.all(promises);

        const resultSets = responses.map(res => res.data.meals || []);

        
        let finalMeals = resultSets[0];

      
        for (let i = 1; i < resultSets.length; i++) {
          const currentSetIds = new Set(resultSets[i].map(meal => meal.idMeal));
          finalMeals = finalMeals.filter(meal => currentSetIds.has(meal.idMeal));
        }

        if (finalMeals.length > 0 && props.sort) {
          finalMeals.sort((a, b) => {
            const nameA = (a.strMeal || a.name).toLowerCase();
            const nameB = (b.strMeal || b.name).toLowerCase();
            if (props.sort === 'asc') return nameA.localeCompare(nameB);
            return nameB.localeCompare(nameA);
          });
        }

        setRecipes(finalMeals);

      } catch (err) {
        console.error("Error fetching recipes:", err);
        setRecipes([]);
      }
    };

    fetchRecipes();
  }, [props.keyword, props.category, props.area, props.sort, props.searchValue, props.searchType]);

  const dataRender = recipes;

  return (
    <div className='min-h-screen bg-neutral-900'> {/* Added dark background base */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8'>
        {dataRender.map((food) => (
          <div key={food.idMeal || food.id} className="relative group bg-neutral-800/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-neutral-700 hover:border-orange-500/50" >

            {/* Like Button */}
            <button
              className='absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-md p-2 rounded-full shadow-sm hover:bg-neutral-800 transition group-hover:opacity-100'
              onClick={() => handleLike(food)}
            >
              {favorites.some(fav => fav.name === (food.name || food.strMeal)) ?
                <AiFillHeart className='h-6 w-6 text-red-500' /> :
                <AiOutlineHeart className='h-6 w-6 text-gray-300 hover:text-red-400 transition-colors' />
              }
            </button>

            {/* Clickable Card Area -> Open Modal */}
            <div className="block h-full cursor-pointer" onClick={() => handleViewRecipe(food.idMeal || food.id)}>
              <div className="h-56 overflow-hidden relative">
                <img
                  src={food.image || food.strMealThumb}
                  alt={food.name || food.strMeal}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>

                { /* View Recipe Button Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-2 px-6 rounded-full shadow-lg">
                    View Recipe
                  </button>
                </div>
              </div>

              <div className="p-5">
                <h1 className='text-xl font-bold text-gray-100 line-clamp-1 mb-2 group-hover:text-orange-500 transition-colors'>{food.name || food.strMeal}</h1>
                <p className='text-sm text-gray-400 line-clamp-2'>{food.strArea ? `${food.strArea} • ${food.strCategory}` : (food.description || "Click to see details")}</p>
              </div>
            </div>
          </div>
        ))}

        {recipes.length === 0 && (
          <div className="col-span-full text-center text-gray-500 mt-20 flex flex-col items-center">
            <p className="text-2xl font-semibold mb-2">No recipes found 🍳</p>
            <p>Try searching for something else!</p>
          </div>
        )}
      </div>

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeRecipeDetails}>
          <div className="bg-neutral-900/95 border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-fadeIn" onClick={e => e.stopPropagation()}>

            {/* Close Button */}
            <button
              onClick={closeRecipeDetails}
              className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-orange-500 transition-colors"
            >
              <AiOutlineClose className="text-xl" />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img
                  src={selectedRecipe.strMealThumb}
                  alt={selectedRecipe.strMeal}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:bg-gradient-to-r"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <h2 className="text-3xl font-bold text-white mb-2 shadow-black drop-shadow-md">{selectedRecipe.strMeal}</h2>
                  <div className="flex gap-3">
                    <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm border border-orange-500/30 backdrop-blur-md">
                      {selectedRecipe.strCategory}
                    </span>
                    <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm border border-amber-500/30 backdrop-blur-md">
                      {selectedRecipe.strArea}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8">
                {/* Ingredients */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                    Ingredients
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Array.from({ length: 20 }).map((_, i) => {
                      const ingredient = selectedRecipe[`strIngredient${i + 1}`];
                      const measure = selectedRecipe[`strMeasure${i + 1}`];
                      return ingredient && ingredient.trim() !== "" ? (
                        <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                          <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></span>
                          <span className="font-medium text-gray-100">{measure}</span> {ingredient}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-xl font-bold text-orange-400 mb-4">Instructions</h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm text-justify">
                    {selectedRecipe.strInstructions}
                  </p>
                </div>

                {/* YouTube Link */}
                {selectedRecipe.strYoutube && (
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <a
                      href={selectedRecipe.strYoutube}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                    >
                      Watch on YouTube
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay for Details */}
      {loadingDetails && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white font-bold">Loading Recipe...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Recipe