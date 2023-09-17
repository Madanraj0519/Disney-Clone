import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '2ec0d66f5bdf1dd12eefa0723f1479cf';
const BASE_URL = 'https://api.themoviedb.org/3';

// Async thunk for fetching movie videos
export const fetchMovieVideos = createAsyncThunk(
  'movieVideos/fetchMovieVideos',
  async (movieId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
      );
      return response.data.results;
    } catch (error) {
      throw new Error('Failed to fetch movie videos.');
    }
  }
);

const movieVideosSlice = createSlice({
  name: 'movieVideos',
  initialState: {
    videos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchMovieVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieVideosSlice.reducer;
