import React from 'react';
import loaderImg from '../../assets/loader.png'; // adjust path if needed


const Loader = () =>{
  return(
    <div className="relative flex justify-center items-center">
    <div className="absolute animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-yellow-500"></div>
    <img src={loaderImg} className="rounded-full h-12 w-12 animate-pulse" />

</div>
  )
};

export default Loader; 