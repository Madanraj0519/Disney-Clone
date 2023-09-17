import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {AiTwotoneDelete} from "react-icons/ai";
import {removeWatchList} from "../features/WatchList/watchList";
import { useDispatch} from 'react-redux';
const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";

const WatchList = () => {

    const dispatch  = useDispatch();
    const {watchListMovies} = useSelector((state) => state.watchList);
    // console.log(watchListMovies);

    const handleWatchList = (movie) => {
        dispatch(removeWatchList(movie));
    }

  return (
    <div className='scroll grid md:grid-cols-6 overflow-x-auto overflow-clip gap-8
     scrollbar-none scroll-smooth pt-4 px-8 pb-4'>
     {
        watchListMovies.map((movie) => (
       <div className='relative'>
        <Link to={`/detail/${movie.id}`}>
          <div className='w-[110px] md:w-[200px] rounded-lg relative
            hover:border-[3px] border-gray-400 cursor-pointer
            hover:scale-110 transition-all duration-150 ease-in'>
            <img src={IMAGE_BASE_URL+movie.poster_path} />
          </div>
        </Link>
        <div className='absolute -bottom-3 -right-1 w-12 h-12 p-2 cursor-pointer
           rounded-full bg-[#000000d2]' onClick={() => handleWatchList(movie.id)}>
          <AiTwotoneDelete className='text-3xl text-white' />
          </div>
       </div>
        ))
     }
    </div>
  )
}

export default WatchList