import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites, removeFavorite } from '../store/favoritesSlice';
import { FaTrashAlt } from "react-icons/fa";

const Fav = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { items: favorites, loading, error } = useSelector((state) => state.favorites);

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchFavorites(user.id));
        }
    }, [dispatch, user]);

    const handleRemove = (id) => {
        dispatch(removeFavorite(id));
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl">Please login to view your favorites.</p>
            </div>
        );
    }

    if (loading) return <div className="text-center mt-20 text-white text-xl">Loading...</div>;
    if (error) return <div className="text-center mt-20 text-red-500 text-xl font-bold">Error: {error}</div>;

    return (
        <div className='flex flex-col items-center w-full min-h-screen relative py-10'>
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-bl from-amber-500/10 to-transparent -z-10 pointer-events-none"></div>

            <h1 className='text-4xl font-bold mb-10 bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent'>Your Favorite Dishes</h1>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center text-center mt-20">
                    <p className="text-2xl text-gray-500 mb-4">No favorites added yet 💔</p>
                    <p className="text-gray-600">Go explore categories to find something you love!</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 w-full max-w-7xl'>
                    {favorites.map((food) => (
                        <div key={food.id} className="relative group bg-neutral-800/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-neutral-700">
                            {/* Remove Button (Floating) */}
                            <button
                                className='absolute top-3 right-3 bg-black/40 backdrop-blur-md p-2 rounded-full shadow-sm hover:bg-red-500/80 transition z-20 group-hover:opacity-100'
                                onClick={() => handleRemove(food.id)}
                                title="Remove from favorites"
                            >
                                <FaTrashAlt className='h-4 w-4 text-white' />
                            </button>

                            {/* Clickable Card -> YouTube (Logic from Refactor) */}
                            {/* Note: In favorites we might not have strYoutube unless we saved it, but schema didn't have it. 
                                So we construct a search link like in Recipe.jsx 
                            */}
                            <a href={`https://www.youtube.com/results?search_query=${food.name}`} target='_blank' rel="noreferrer" className="block h-full">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={food.image}
                                        alt={food.name}
                                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                    />
                                </div>

                                <div className="p-5">
                                    <h3 className='text-xl font-bold mb-1 text-gray-100 line-clamp-1 group-hover:text-orange-500 transition-colors'>{food.name}</h3>
                                    <p className='text-sm text-gray-400 line-clamp-2'>{food.description}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Fav;