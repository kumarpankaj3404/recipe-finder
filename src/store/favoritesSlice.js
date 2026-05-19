import { createSlice } from '@reduxjs/toolkit';

const FAVORITES_STORAGE_KEY = 'recipe-finder:favorites';

const readJSON = (key, fallback) => {
    if (typeof window === 'undefined') {
        return fallback;
    }

    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
};

const writeJSON = (key, value) => {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.setItem(key, JSON.stringify(value));
};

const readFavorites = () => readJSON(FAVORITES_STORAGE_KEY, []);
const saveFavorites = (favorites) => writeJSON(FAVORITES_STORAGE_KEY, favorites);

const createFavoriteRecord = (recipe) => ({
    id: recipe.idMeal || recipe.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: recipe.name,
    description: recipe.description,
    image: recipe.image,
});

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: readFavorites(),
        loading: false,
        error: null,
    },
    reducers: {
        addFavorite: (state, action) => {
            const recipe = action.payload;
            const existingFavorite = state.items.find((favorite) => favorite.id === recipe.id);

            if (existingFavorite) {
                return;
            }

            const nextFavorites = [...state.items, createFavoriteRecord(recipe)];
            state.items = nextFavorites;
            saveFavorites(nextFavorites);
        },
        removeFavorite: (state, action) => {
            const nextFavorites = state.items.filter((item) => item.id !== action.payload);
            state.items = nextFavorites;
            saveFavorites(nextFavorites);
        },
        clearFavorites: (state) => {
            state.items = [];
            saveFavorites([]);
        },
    },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
