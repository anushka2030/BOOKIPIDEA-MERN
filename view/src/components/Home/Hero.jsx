import React from 'react';
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="mt-10 mb-10md:h-[75vh] flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-500 px-6 lg:px-16 py-12 gap-12">
      
      {/* Text Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
        <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 animate-pulse">
          Discover Books That Speak to You
        </h1>
        <p className="mt-4 text-xl text-yellow-50">
          Dive into our rich collection of books and find the perfect title for your next reading adventure. Delivered right to your door.
        </p>
        <div className="mt-8">
          <Link
            to="/all-books"
            className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 rounded-full px-10 py-3 hover:bg-zinc-800 transition-all duration-300"
          >
            Discover Books
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <img src="./books.png" alt="Books" className="max-w-full h-auto lg:max-h-[400px]" />
      </div>
    </div>
  );
};

export default Hero;
