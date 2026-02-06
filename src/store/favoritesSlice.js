import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../supabaseClient';

export const fetchFavorites = createAsyncThunk(
    'favorites/fetchFavorites',
    async (userId, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase
                .from('Recipe')
                .select('id, user_id, name, description, image') // Removed recipe_id
                .eq('user_id', userId);

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const addFavorite = createAsyncThunk(
    'favorites/addFavorite',
    async ({ userId, recipe }, { rejectWithValue }) => {
        try {
            const payload = {
                user_id: userId,
                name: recipe.name,
                description: recipe.description,
                image: recipe.image
            };

            const { data, error } = await supabase
                .from('Recipe')
                .insert([payload])
                .select();

            if (error) throw error;
            return data[0];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const removeFavorite = createAsyncThunk(
    'favorites/removeFavorite',
    async (id, { rejectWithValue }) => {
        try {
            const { error } = await supabase
                .from('Recipe') // Changed from 'favorites'
                .delete()
                .eq('id', id);

            if (error) throw error;
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export default favoritesSlice.reducer;
