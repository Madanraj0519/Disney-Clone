import React from 'react';
import { Link } from 'react-router-dom';

const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";

function MovieCard({movie}) {
  return (
      <Link to={`/detail/${movie.id}`}>
      <div className='w-[110px] md:w-[200px] rounded-lg
        hover:border-[3px] border-gray-400 cursor-pointer
        hover:scale-110 transition-all duration-150 ease-in'>
        <img src={IMAGE_BASE_URL+movie.poster_path} />
      </div>
      </Link>
  )
}

export default MovieCard