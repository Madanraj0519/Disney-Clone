import { createSlice } from "@reduxjs/toolkit";

const watchListSlice = createSlice({
    name: "watchList",
    initialState:{
        watchListMovies:[]
    },
    reducers:{
        addToWatchList: (state, action) => {
            const addToWatch = action.payload;
            if(!state.watchListMovies.some((movie) => movie.id === addToWatch.id)){
                state.watchListMovies.push(action.payload);
            }
        },
        removeWatchList: (state, action) => {
            state.watchListMovies = state.watchListMovies.filter(
                (movie) => movie.id !== action.payload
            );
        },
    }
});

export const {addToWatchList, removeWatchList} = watchListSlice.actions;

export default watchListSlice.reducer;