import React, { useEffect, useRef, useState } from 'react'
import MovieCard from './MovieCard';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import HrMovieCard from './HrMovieCard';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {API_KEY, BASE_URL} from "../Constant/Api_key";


function MovieList({genreId,index_}) {

    const dispatch = useDispatch();
    const [movieState, setMovieState] = useState([]);

    const elementRef=useRef(null);

    const slideRight=(element)=>{
        element.scrollLeft+=500;
    }
    const slideLeft=(element)=>{
        element.scrollLeft-=500;
    }

    useEffect(() => {
        // dispatch(fetchGenreMovieById(genreId.id));
        getbyGenre(genreId.id);
    },[genreId, dispatch]);

    const getbyGenre = (genre) => {
      axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre}`)
      .then(res =>{
        setMovieState(res.data.results)
      })
    }

  return (
    <div className='relative'>
         <IoChevronBackOutline onClick={()=>slideLeft(elementRef.current)} 
         className={`text-[50px] text-white
           p-2 z-10 cursor-pointer 
            hidden md:block absolute
            ${index_%3==0?'mt-[80px]':'mt-[150px]'} `}/>
   
    <div ref={elementRef} className='scroll flex overflow-x-auto overflow-clip gap-8
     scrollbar-none scroll-smooth pt-4 px-3 pb-4'>
        {movieState.map((item,index)=>(
           <div>
          {index_%3==0?<HrMovieCard movie={item}/>:<MovieCard movie={item} />}
           </div> 
        ))}
    </div>
    <IoChevronForwardOutline onClick={()=>slideRight(elementRef.current)}
           className={`text-[50px] text-white hidden md:block
           p-2 cursor-pointer z-10 top-0
            absolute right-0 
            ${index_%3==0?'mt-[80px]':'mt-[150px]'}`}/> 
    </div>
  )
}

export default MovieList