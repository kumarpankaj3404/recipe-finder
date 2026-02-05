import React from 'react';
import { useParams } from 'react-router-dom';
import Recipe from './Recipe';

const CategoryDetails = () => {
    const { category } = useParams();

    return (
        <div className="min-h-screen py-10 px-4 relative">
            <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-orange-500/10 to-transparent -z-10 pointer-events-none"></div>

            <div className="text-center mb-10">
                <h1 className='text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent'>{category} Recipes</h1>
                <p className="text-gray-400 text-lg">Delicious dishes from the {category} category</p>
            </div>

            <Recipe
                searchValue={category}
                searchType="category"
            />
        </div>
    );
};

export default CategoryDetails;
