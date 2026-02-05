import React, { useState, useEffect } from 'react';
import Recipe from './Recipe';
import axios from 'axios';

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [sort, setSort] = useState("asc"); // asc, desc

  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

  // Fetch Categories and Areas for filters
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        if (catRes.data.meals) setCategories(catRes.data.meals);

        const areaRes = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        if (areaRes.data.meals) setAreas(areaRes.data.meals);
      } catch (err) {
        console.error("Error fetching filters", err);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  }

  // Pass filter logic to Recipe component or handle it here?
  // Current Recipe component takes 'search' prop which is just a string.
  // TheMealDB API is a bit restrictive: search.php?s=name OR filter.php?c=cat OR filter.php?a=area.
  // It doesn't support combined "search name AND category".
  // So we will prioritize: 
  // 1. If keyword exists -> search by name (or ingredient, but let's stick to name for simplicity or pass searchType).
  // 2. If no keyword but category selected -> filter by category.
  // 3. If area selected -> filter by area.
  // Converting this to a single query to pass to Recipe component might be tricky if Recipe component expects a ready-to-use search string or does the fetching itself.
  // Let's look at Recipe.jsx again. It uses `search.php ? s = ${ props.search } `.
  // We should probably modify Recipe.jsx to accept a full query URL or handle the logic there.
  // OR, better, Search.jsx handles the data fetching and passes the RESULTS to Recipe.jsx.
  // But Recipe.jsx currently does the fetching.
  // To avoid rewriting Recipe.jsx entirely right now, I'll update Recipe.jsx to accept a 'queryUrl' or similar, OR update Search.jsx to just pass the 'keyword' and maybe let Recipe handle checks?
  // Actually, rewriting Recipe.jsx to just DISPLAY data (presentation component) and let Search/Categories fetch data (container) is better architecture.
  // However, for this task, I'll update Search.jsx to construct the query concept and pass it to Recipe, OR just use Recipe for display.
  // The existing Recipe.jsx does `axios.get`.

  // Let's modify Search to pass the specific search term to Recipe, but Recipe assumes `s = `.
  // If we want filtering, we might need to change how Recipe fetches.
  // Let's assume for now filters are applied client side on the search results OR we ignore combining filters.

  // Actually, the user asked for "search recipe with filters and sort options directly connected to the api".
  // So if I select Category 'Seafood', it should hit `filter.php ? c = Seafood`.

  // I will refactor logic: Search.jsx will control the "query" passed to Recipe.
  // Because Recipe.jsx expects `search` prop and does `search.php ? s = ${ search } `, it's tightly coupled to name search.
  // I will update Recipe.jsx to accept a `fetchUrl` prop instead of `search` string, or make it smart.
  // But first, let's just make the UI in Search.jsx and pass the raw search string if it's a name search.
  // If it's a category/area filter, Recipe.jsx needs to handle it.

  // Plan:
  // Update Recipe.jsx to genericize fetching? Or Update Search.jsx to just pass `s = keyword` or `c = category`.

  return (
    <div className='flex flex-col items-center w-full min-h-screen px-4 py-10 relative'>
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-500/10 to-transparent -z-10"></div>

      <div className="text-center mb-12">
        <h1 className='text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent'>Find Your Recipe</h1>
        <p className="text-gray-400 text-lg">Search by name, category, or cuisine.</p>
      </div>

      <div className="w-full max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl mb-12">
        <form className='flex flex-col md:flex-row gap-4' onSubmit={handleSearch}>
          <div className="flex-1">
            <input
              type='text'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className='w-full bg-neutral-900/50 border border-neutral-700 text-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition placeholder-gray-500'
              placeholder="Search by Name (e.g. Chicken)..."
            />
          </div>

          <div className="flex gap-3 flex-wrap sm:flex-nowrap">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 sm:flex-none border border-neutral-700 bg-neutral-900/50 text-gray-300 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 cursor-pointer hover:bg-neutral-800 transition"
            >
              <option value="">Category</option>
              {categories.map(cat => (
                <option key={cat.strCategory} value={cat.strCategory}>{cat.strCategory}</option>
              ))}
            </select>

            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="flex-1 sm:flex-none border border-neutral-700 bg-neutral-900/50 text-gray-300 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 cursor-pointer hover:bg-neutral-800 transition"
            >
              <option value="">Area</option>
              {areas.map(a => (
                <option key={a.strArea} value={a.strArea}>{a.strArea}</option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="flex-1 sm:flex-none border border-neutral-700 bg-neutral-900/50 text-gray-300 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500 cursor-pointer hover:bg-neutral-800 transition"
            >
              <option value="asc">Sort: A-Z</option>
              <option value="desc">Sort: Z-A</option>
            </select>
          </div>
        </form>
      </div>

      <Recipe
        keyword={keyword}
        category={category}
        area={area}
        sort={sort}
      />

    </div>
  )
}

export default Search