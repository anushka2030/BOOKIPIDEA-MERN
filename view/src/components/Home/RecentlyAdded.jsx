import React, { useState,useEffect } from "react";
import axios  from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader"; 
      
const RecentlyAdded = ()=>{
    const [Data, setData] = useState([]);
    useEffect(() => {
        const fetch = async () => {
          try {
            const response = await axios.get("http://localhost:1000/api/v1/get-recent-books");
            setData(response.data.data);
            console.log(response.data.data);

          } catch (error) {
            console.error("Error fetching books:", error);
          }
        };
        fetch();
      }, []);
      

    return(
        <div className = "mt-8 px-4">
            <h3 className ="text-2xl text-yellow-100 font-semibold">Recently Shelved</h3>
            {!Data && 
            <div className= "flex items-center justify-center">(<Loader/>)</div>
            }
            <div className="mx-4 my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">

               {Data && Data.map((items,i)=>(
                <div key = {i}>
                    <BookCard data = {items} /> {" "}
                </div>
               ))} 
            </div>
        </div>
    );
};
export default RecentlyAdded;