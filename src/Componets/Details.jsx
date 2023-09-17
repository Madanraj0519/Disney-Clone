import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { IMAGE_BASE_URL } from '../Constant/Api_key';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../features/Movie/movieDetail';
import {fetchMovieVideos} from "../features/Movie/movieVideo";
import {addToWatchList} from "../features/WatchList/watchList"
import {FaPlay, FaRegPlayCircle} from "react-icons/fa"


const Details = () => {

  const {id} = useParams();
  const dispatch  = useDispatch();
  const [active, setActive] = useState(false);
  const {selectedMovie, loading, error} = useSelector((state) => state.movieDetail);
  const {videos, loading: videoLoading, error: videoError} = useSelector((state) => state.movieVideos)

  // console.log(selectedMovie);
  // console.log(videos);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
    dispatch(fetchMovieVideos(id));
  },[dispatch, id]);

  const handleWatchList = (movie) => {
      dispatch(addToWatchList(movie));
      setActive(true);
  }

  if (loading || videoLoading) {
    return <div>Loading...</div>;
  }

  if (error || videoError) {
    return <div>Error: {error}</div>;
  }

  if (!selectedMovie) {
    return <div>Movie details not found.</div>;
  }

  return (
    <div className='detail-container relative overflow-hidden block  '>
      <div className='background opacity-60 left-0 right-0'>
        {/* <img src={`${IMAGE_BASE_URL}${selectedMovie.poster_path}`} alt={selectedMovie.original_title}
        className='w-full h-[100vh]'/> */}
        <iframe src={`https://www.youtube.com/embed/${videos[0].key}?autoplay=1&loop=1&controls=0&showinfo=0&mute=1`}  frameborder="0"  className='w-screen h-[100vh] pointer-events-none'></iframe>
      </div>
      <div className='content max-w-[874px] absolute top-80 p-4'>
        <div className='control flex items-center gap-5 flex-row flex-nowrap my-6 m-0 min-h-[56px] '>
          <div className='player text-base mb-5 h-14 rounded-md cursor-pointer flex p-6
          items-center justify-center space-x-1 text-center uppercase bg-[#00000099] hover:bg-zinc-900 border-none text-white'>
            <FaPlay />
            <span>Play</span>
          </div>
          <a href={`https://www.youtube.com/watch?v=${videos[0].key}`} className='trailer text-base mb-5 h-14 rounded-md cursor-pointer flex p-6
          items-center justify-center space-x-1 text-center uppercase bg-[#00000099] hover:bg-zinc-900 border-none text-white '>
            <FaRegPlayCircle />
            <span>Trailer</span>
          </a>
          <div className={`addList ${active && "active"}`} onClick={() => handleWatchList(selectedMovie)}>
            <span />
            <span />
          </div>
        </div>
        <div className='subTitle text-[#f9f9f9f] text-base md:text-2xl min-h-[20px] '>{selectedMovie.original_title}</div>
        <div className='subTitle text-[#f9f9f9f] text-base md:text-lg min-h-[20px] '>Release date : {selectedMovie.release_date}</div>
        <div className='subTitle text-[#f9f9f9f] text-base md:text-lg min-h-[20px] '>Runtime : {selectedMovie.runtime}mins</div>
        <div className='space-x-2 text-base md:text-xl py-4 text-[#f9f9f9] '>{selectedMovie.overview}</div>
      </div>    
    </div>
  )
}

export default Details