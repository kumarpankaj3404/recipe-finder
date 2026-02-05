import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then((res) => {
                setCategories(res.data.categories);
                setLoading(false);
            })
            .catch(err => {
                console.error("API error:", err);
                setLoading(false);
            });

    }, []);

    const filteredCategories = categories.filter((cat) => (
        cat.strCategory !== "Miscellaneous" && cat.strCategory !== "Beef"
    ));

    return (
        <div className='flex flex-col justify-center items-center w-full min-h-screen py-10 px-4 relative' >
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-bl from-orange-500/10 to-transparent -z-10 pointer-events-none"></div>

            {loading ? (
                <div className='flex justify-center items-center h-screen'>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 border-opacity-50"></div>
                </div>
            ) : (
                <>
                    <div className="text-center mb-12">
                        <h1 className='text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent'>Explore Categories</h1>
                        <p className="text-gray-400 text-lg">Detailed recipes for every craving.</p>
                    </div>
                    <div className='w-full max-w-7xl'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {filteredCategories.map((food) => (
                                <Link to={`/category/${food.strCategory}`} key={food.idCategory} className="block group h-full">
                                    <div className="bg-neutral-800/50 backdrop-blur-md border border-neutral-700 text-gray-300 relative p-8 rounded-3xl flex flex-col items-center hover:bg-neutral-800 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-300 h-full" >
                                        <div className="w-full h-48 mb-6 overflow-hidden rounded-xl bg-white/5 p-4">
                                            <img src={food.strCategoryThumb} alt={food.strCategory} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <h1 className='text-2xl font-bold mt-2 text-center text-gray-100 group-hover:text-orange-400 transition-colors'>{food.strCategory}</h1>
                                        <p className='text-sm text-gray-400 text-center mt-4 line-clamp-3 leading-relaxed group-hover:text-gray-300 transition-colors'>{food.strCategoryDescription}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Categories