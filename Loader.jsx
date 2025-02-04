import React from 'react';

const Loader = () =>{
  return(
    <div className="relative flex justify-center items-center">
    <div className="absolute animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-yellow-500"></div>
    <img src="./loader.png"  class="rounded-full h-12 w-12 animate-pulse"></img>
</div>
  )
};

export default Loader; 