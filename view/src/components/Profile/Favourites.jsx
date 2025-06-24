import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]); // Initialize as an empty array

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Corrected "authorization"
  };
  
  const handleRemove = (bookId) => {
    setFavouriteBooks(prev => prev.filter(book => book._id !== bookId));
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-favourite-books", // Fixed URL
          { headers }
        );
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
      {FavouriteBooks.length === 0 && (
        <div className="col-span-4 text-center">
          <img src="./public/nores.png" alt="No results" className="mx-auto mb-4 mt-4 h-[88vh]" />
          <p className="text-zinc-200">No favourite books added yet.</p>
        </div>
      )}
      {FavouriteBooks.map((item) => (
        <div key={item._id} className="flex flex-col items-center">
          {/* BookCard component */}
          <BookCard data={item} favourite={true} onRemove={handleRemove}/>
        </div>
      ))}
    </div>
  );
};

export default Favourites;
