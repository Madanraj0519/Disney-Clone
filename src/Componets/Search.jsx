import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchSearchMovie, fetchSearchSeries} from "../features/Movie/searchMovie";
import {fetchTrendingMovies} from "../features/Movie/MoviesSlice"
import {FaSearch} from "react-icons/fa";
import { Link } from 'react-router-dom';
const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";

const Search = () => {

    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('movie');
    const dispatch = useDispatch();
    const { searchResult, loading, error, Query} = useSelector((state) => state.search);
    const {trendingMovies} = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchTrendingMovies());
    },[dispatch])

    const handleSearch = () => {
      if(searchType === 'movie') {
        dispatch(fetchSearchMovie(query));
      }else{
        dispatch(fetchSearchSeries(query));
      }
    }

    console.log(Query);


  return (
    <div>
        <div className='relative max-w-full p-4 md:px-20 font-mono'>
            <input className='relative search w-full h-12 rounded-xl text-black text-xl bg-slate-100 text-center placeholder:text-slate-900'
             placeholder='Search for movies/series'
             type='text'
             value={query}
             onChange={(e) => setQuery(e.target.value)} />
           <button className='absolute right-20 focus:outline-none border-none top-[16px] bg-slate-100'
           onClick={handleSearch}>
              <FaSearch className='text-2xl text-slate-900'/>
           </button>
        </div>
        <div className='flex justify-end md:px-20 mb-10'>
          <div className='relative'>
           <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
             <option value="movie">Movie</option>
             <option value="tv">TV Show</option>
          </select>
          </div>
        </div>
        <div className='px-9 mb-4 text-2xl'>
          <h2>{`Your ${searchType === "movie" ? "Movies" : "Tv Shows"} Search result`}</h2>
        </div>
        <div className='scroll grid grid-cols-3 md:grid-cols-6 overflow-x-auto overflow-clip gap-8
         scrollbar-none scroll-smooth pt-4 px-8 pb-4'>
       {
       Query ? 
       searchResult.map((movie) => (
        <div className='relative'>
         <Link to={`/detail/${movie.id}`}>
           <div className='w-[110px] md:w-[200px] rounded-lg relative
             hover:border-[3px] border-gray-400 cursor-pointer
             hover:scale-110 transition-all duration-150 ease-in'>
             <img src={IMAGE_BASE_URL+movie.poster_path} />
           </div>
         </Link>
        </div>
         ))
          :
          trendingMovies.map((movie) => (
            <div className='relative'>
             <Link to={`/detail/${movie.id}`}>
               <div className='w-[110px] md:w-[200px] rounded-lg relative
                 hover:border-[3px] border-gray-400 cursor-pointer
                 hover:scale-110 transition-all duration-150 ease-in'>
                 <img src={IMAGE_BASE_URL+movie.poster_path} />
               </div>
             </Link>
            </div>
        ))

     }
        </div>
    </div>
  )
}

export default Search