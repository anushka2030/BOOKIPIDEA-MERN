import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite, onRemove }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };
  
  const handleRemoveBook = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/remove-book-from-favourites",
      {},
      { headers }
    );
    onRemove(data._id);
    alert(response.data.message);
  };
  
  return (
    <div className="relative w-full h-full">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-neutral-950 rounded-xl p-4 flex flex-col shadow-md hover:shadow-xl transition-all duration-300 gap-2 hover:scale-[1.02] group h-full">

         <div className="rounded-xl overflow-hidden aspect-[3/4] relative">
  <img
    className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-300"
    src={data.url}
    alt={data.title}
  />

            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </div>
          
          <div className="space-y-2 flex-1">
            <h2 className="text-xl text-yellow-300 font-bold truncate hover:text-yellow-400">
              {data.title}
            </h2>
            <p className="text-zinc-400 font-medium truncate">by {data.author}</p>
            <p className="text-zinc-200 font-bold text-xl">₹{data.price}</p>
          </div>
        </div>
      </Link>

      {favourite && (
        <button
          onClick = {handleRemoveBook}
          className="absolute top-2 right-4 bg-yellow-50 px-3 py-1 rounded-full border-r-4 border-b-4 border-yellow-500 text-yellow-600 font-semibold hover:bg-yellow-500 hover:text-white transition-colors duration-300"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default BookCard;