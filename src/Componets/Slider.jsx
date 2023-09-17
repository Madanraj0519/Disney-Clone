import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpcomingMovies } from '../features/Movie/MoviesSlice';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";
const screenWidth=window.innerWidth;


function Slider() {
    const dispatch = useDispatch();
    const {upcomingMovies, loading, error} = useSelector((state) => state.movies);
    // console.log(upcomingMovies);

    const elementRef=useRef();

    const sliderRight=(element)=>{
        element.scrollLeft+=screenWidth-110
    }
    const sliderLeft=(element)=>{
        element.scrollLeft-=screenWidth-110
    }

    useEffect(() => {
        dispatch(fetchUpcomingMovies());
      },[dispatch])

  return (
    <div>
       <div className='opacity-25 hover:opacity-100'>
       <HiChevronLeft className="hidden md:block text-white text-[30px] absolute
        mx-8 mt-[150px] cursor-pointer " 
        onClick={()=>sliderLeft(elementRef.current)}/>
        <HiChevronRight className='hidden md:block text-white text-[30px] absolute
        mx-8 mt-[150px] cursor-pointer right-0' 
        onClick={()=>sliderRight(elementRef.current)}/>
       </div>

   
    <div className=' scroll flex overflow-x-auto w-full px-16 py-4
    scrollbar-none scroll-smooth' ref={elementRef}> 
        {upcomingMovies.map((item)=>(
            <>
                <img src={IMAGE_BASE_URL+item.backdrop_path} 
            className='min-w-full  md:h-[310px] object-center
             mr-5 rounded-md hover:border-[4px]
            border-gray-400 transition-all duration-100 ease-in'/>
             </>   
        ))}
    </div>
    </div>
  )
}

export default Slider