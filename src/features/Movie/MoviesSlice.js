import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {API_KEY, BASE_URL} from "../../Constant/Api_key"
import axios from "axios";

// async function for fetching upcoming movies
export const fetchUpcomingMovies = createAsyncThunk(
    'movies/fetchUpcomingMovies',
    async () => {
        try{
            const res = await axios.get(
                `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`
            );
            return res.data.results;
        }catch(error) {
            throw new Error("failed to fetch upcoming movies");
        }
    }
);

export const fetchTrendingMovies = createAsyncThunk(
    'movies/fetchTrendingMovies',
    async () => {
        try{
            const res = await axios.get(
                `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
            );
            return res.data.results;
        }catch(error) {
            throw new Error("failed to fetch upcoming movies");
        }
    }
);

const moviesSlice = createSlice({
   name:"movies",
   initialState:{
    upcomingMovies:[],
    trendingMovies:[],
    loading:false,
    error:null,
   },
   reducers:{},
   extraReducers:(builder) => {
    builder
    .addCase(fetchUpcomingMovies.pending, (state) =>{
        state.loading = true;
        state.error= null;
    })
    .addCase(fetchUpcomingMovies.fulfilled, (state, action) =>{
        state.loading = false;
        state.upcomingMovies = action.payload;
    })
    .addCase(fetchTrendingMovies.fulfilled, (state, action) =>{
        state.loading = false;
        state.trendingMovies = action.payload;
    })
    .addCase(fetchUpcomingMovies.rejected, (state, action) =>{
        state.loading = false;
        state.error= action.error.message;
    })
   },
}
);

export default moviesSlice.reducer;