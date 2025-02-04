import React from 'react'
import {Link} from "react-router-dom";
const Hero = () =>{
    return (
        <div className="md:h-[75vh] flex flex-col md:flex-row items-center justify-center" >
            <div className = "w-full mb:12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify center">
                <h1 className = "text-4xl mt-10 lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left animate-pulse">Discover Books That Speak to You</h1>
                <p className = "mt-4 text-xl text-center lg:text-left text-yellow-50">
                Dive into our rich collection of books and find the perfect title for your next reading adventure. Delivered right to your door.
                </p>
                <div className = "mt-8 animate-bounce">
                <Link to ="/all-books" className = " text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 rounded-full px-10 py-3 hover:bg-zinc-800 border-x-blue-50 ">Discover Books</Link>
                </div>
            </div>
            <div className = "mt-5  w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify center animate-none">
                <img  src="./books.png" alt = "pic"></img> 
            </div>
        </div>
    )
}
export default Hero