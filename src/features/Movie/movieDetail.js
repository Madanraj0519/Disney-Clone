import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {API_KEY, BASE_URL} from "../../Constant/Api_key"
import axios from "axios";


export const fetchMovieDetails = createAsyncThunk(
    'movieDetails/fetchMovieDetails',
    async (movieId) => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
        );
        return response.data;
      } catch (error) {
        throw new Error('Failed to fetch movie details.');
      }
    }
  );
  
  const movieDetailsSlice = createSlice({
    name: 'movieDetails',
    initialState: {
      selectedMovie: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchMovieDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchMovieDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.selectedMovie = action.payload;
        })
        .addCase(fetchMovieDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default movieDetailsSlice.reducer;