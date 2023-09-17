import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, BASE_URL } from "../../Constant/Api_key";
import axios from "axios";


export const fetchSearchMovie = createAsyncThunk(
    'search/fetchSearchMovie',
     async(searchMovie) => {
        try{
            const response = await axios.get(
                `${BASE_URL}/search/movie?query=${searchMovie}&api_key=${API_KEY}`
            )
            return response.data.results;
        }catch(err){
            throw new Error("Error in fetching search movie");
        }
    }
);

export const fetchSearchSeries = createAsyncThunk(
    'search/fetchSearchSeries',
     async(searchMovie) => {
        try{
            const response = await axios.get(
                `${BASE_URL}/search/tv?query=${searchMovie}&api_key=${API_KEY}`
            )
            return response.data.results;
        }catch(err){
            throw new Error("Error in fetching search movie");
        }
    }
);

const searchSlice = createSlice({
    name:"search",
    initialState:{
        Query:'',
        searchResult : [],
        loading: false,
        error : null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSearchMovie.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSearchMovie.fulfilled, (state, action) =>{
            state.loading = false;
            state.Query = action.payload;
            state.searchResult = action.payload;
        })
        .addCase(fetchSearchMovie.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(fetchSearchSeries.fulfilled, (state, action) =>{
            state.loading = false;
            state.Query = action.payload;
            state.searchResult = action.payload;
        });
    }
});


export default searchSlice.reducer;