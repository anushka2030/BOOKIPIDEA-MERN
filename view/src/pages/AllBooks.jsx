import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard"; 

const AllBooks  = () =>{
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://bookipidea-mern.onrender.com/api/v1/get-all-books");
        setData(response.data.data);

      } catch (error) {
        console.error("Error fetching books:", error);
      } finally{
        setLoading(false);
      }
    };
    fetch();
  }, []);
  
  return (
  <div className="bg-zinc-900 h-auto px-12 py-8">
    <h3 className="text-2xl text-yellow-100 font-semibold">All Books</h3>

    {loading ? (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <Loader />
      </div>
    ) : (
      <div className="mx-4 my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Data.map((items, i) => (
          <BookCard key={i} data={items} />
        ))}
      </div>
    )}
  </div>
);

};

export default AllBooks; 