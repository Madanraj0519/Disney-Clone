import  { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/User/userSlice";
import moviesReducer from "../features/Movie/MoviesSlice";
import movieDetailReducer from "../features/Movie/movieDetail";
import movieVideoReducer from "../features/Movie/movieVideo";
import watchListReducer from "../features/WatchList/watchList";
import SearchReducer from "../features/Movie/searchMovie";


export default configureStore({
    reducer:{
        user: userReducer,
        movies: moviesReducer,
        movieDetail: movieDetailReducer,
        movieVideos: movieVideoReducer,
        watchList : watchListReducer,
        search: SearchReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});