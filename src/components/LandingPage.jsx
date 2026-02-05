import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiHeart } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
            {/* Background Gradient Blob */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-orange-500/20 rounded-full blur-[120px]"></div>
                <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] bg-amber-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-5xl mx-auto px-6 text-center z-10">
                <h1 className="text-6xl md:text-7xl font-extrabold mb-8 leading-tight">
                    <span className="bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">Discover Your Next</span>
                    <br />
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Favorite Meal</span>
                </h1>

                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Explore thousands of delicious recipes from around the globe.
                    From quick weeknight dinners to gourmet masterpieces.
                </p>

                <Link
                    to="/search"
                    className="inline-block bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold py-4 px-12 rounded-full text-lg shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all duration-300"
                >
                    Start Cooking Now
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-24">
                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-orange-500/50 transition-colors group">
                        <div className="bg-orange-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                            <FiSearch className="text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-100 mb-3">Smart Search</h3>
                        <p className="text-gray-400 leading-relaxed">Find recipes instantly by ingredients you have, dish names, or specific cuisines.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-orange-500/50 transition-colors group">
                        <div className="bg-amber-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                            <BiCategory className="text-amber-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-100 mb-3">Diverse Categories</h3>
                        <p className="text-gray-400 leading-relaxed">Browse a vast collection of dishes categorized by type, from Breakfast to Seafood.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-orange-500/50 transition-colors group">
                        <div className="bg-red-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                            <FiHeart className="text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-100 mb-3">Save Favorites</h3>
                        <p className="text-gray-400 leading-relaxed">Create your personal cookbook. Save recipes to your profile for easy access anytime.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
