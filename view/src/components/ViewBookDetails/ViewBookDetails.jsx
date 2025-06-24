import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaCartArrowDown, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useParams, useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";

const ViewBookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Data, setData] = useState(null); // Initial state as null
  const [isLoading, setIsLoading] = useState(true); // Explicit loading state

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const role = useSelector((state)=>state.auth.role);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false); // Always end loading state
      }
    };
    fetch();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-900">
        <Loader />
      </div>
    );
  }

  if (!Data) {
    return (
      <div className="text-center text-zinc-200 mt-20">
        <h1>Book not found!</h1>
      </div>
    );
  }
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    bookId: id
  }
  const handleFavourite = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-book-to-favourite",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding to favourites:", error);
      alert("Failed to add book to favourites. Please try again.");
    }
  };
  const handleCart = async () =>{
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      {headers}
    );
    alert(response.data.message);
  };
  const deleteBook = async () => {
    //confirmation
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }
  
    try {
      const response = await axios.delete(
        "http://localhost:1000/api/v1/delete-book",
        {headers}
      );
      alert(response.data.message);
      navigate('/all-books');
    } catch (error) {
      console.error("Error deleting book:", error);
      alert(error.response?.data?.message || "Failed to delete book");
    }
  };
  
  return (
    <>
      <div className="lg:h-screen px-7 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start">
        {/* Book Image Section */}
        <div className="bg-zinc-950 rounded p-4 w-full lg:w-3/6 flex justify-around">
          <img
            className="h-[75vh] max-w-full object-cover"
            src={Data.url}
            alt={Data.title}
          />
        </div>

        {/* Icons Section */}
       {isLoggedIn === true && role === "user" &&
        <div className="flex md:flex-col gap-4 justify-center items-center rounded-full ">
        <button
          className="bg-yellow-500 text-zinc-100 p-4 rounded-full shadow-md hover:shadow-lg hover:bg-red-600 transition duration-300"
          title="Add to Favorites"
          onClick={handleFavourite}
        >
          <FaRegHeart size={24} />{" "}
          {/* <span className="ms-4 block lg:hidden">Favourites</span> */}
        </button>
        <button
          className="bg-blue-500 text-white p-4 rounded-full shadow-md hover:shadow-lg hover:bg-blue-800 transition duration-300"
          title="Add to Cart"
          onClick={handleCart}
        >
          <FaCartArrowDown size={24} />{" "}
          {/* <span className=" block lg:hidden">Add to Cart</span> */}
        </button>

      </div>
       }

       {/* Delete and Edit Section */}

       {isLoggedIn === true && role === "admin" &&
        <div className="flex md:flex-col gap-4 justify-center items-center rounded-full ">
        <Link to = {`/updateBook/${id}`}
          className="bg-yellow-500 text-zinc-100 p-4 rounded-full shadow-md hover:shadow-lg hover:bg-red-600 transition duration-300"
          title="Edit"
        >
          <FiEdit size={24} />{" "}
          {/* <span className="ms-4 block lg:hidden">Favourites</span> */}
        </Link>
        <button
          className="bg-blue-500 text-white p-4 rounded-full shadow-md hover:shadow-lg hover:bg-blue-800 transition duration-300"
          title="Delete"
          onClick = {deleteBook}
        >
          <MdDeleteOutline size={24} />{" "}
          {/* <span className=" block lg:hidden">Add to Cart</span> */}
        </button>

      </div>
       }

        {/* Book Details Section */}
        <div className="p-4 w-full lg:w-3/6 text-zinc-200">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 bg-clip-text text-transparent mb-4">
            {Data.title}
          </h1>
          <h2 className="text-xl text-zinc-400 mb-2">by {Data.author}</h2>
          <p className="text-lg mb-4 font-semibold">Price: Rs {Data.price}</p>
          <p className="text-base">{Data.description}</p>
          <p className="flex mt-4 items-center text-zinc-400">
            <GrLanguage className="me-3" />
            {Data.language || "Language not specified"}
          </p>
        </div>
      </div>
    </>
  );
};

export default ViewBookDetails;
