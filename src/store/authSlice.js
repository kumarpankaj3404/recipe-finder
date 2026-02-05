import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../supabaseClient';

// Thunk for Signup (Custom User Table)
export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async ({ email, password, fullName }, { rejectWithValue }) => {
        try {
            // 1. Check if user exists
            const { data: existingUser, error: checkError } = await supabase
                .from('User')
                .select('email')
                .eq('email', email)
                .single();

            if (existingUser) {
                throw new Error('User already exists');
            }

            // Ignore "PGRST116: JSON object requested, multiple (or no) rows returned" which acts as "User not found"
            // But actually .single() returns error if not found.

            // 2. Insert new user
            const { data, error } = await supabase
                .from('User')
                .insert([
                    {
                        email,
                        password, // NOTE: In a real app, NEVER store plain text passwords!
                        name: fullName
                    }
                ])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Thunk for Login (Custom User Table)
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase
                .from('User')
                .select('*')
                .eq('email', email)
                .eq('password', password) // Basic check
                .single();

            if (error || !data) throw new Error('Invalid credentials');
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Thunk for Logout
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        // No server-side session to kill for custom table auth, just clear client state
        return null;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null, // Persist basic auth
        loading: false,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Signup
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                localStorage.removeItem('user');
            });
    },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
