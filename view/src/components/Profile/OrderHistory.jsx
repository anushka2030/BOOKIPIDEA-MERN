import React, { useEffect,useState } from 'react';
import axios from "axios";
import Loader from "../Loader/Loader";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";

const OrderHistory = () =>{
  const [OrderHistory, setOrderHistory] = useState();
  const location = useLocation();

  const headers = {
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() =>{
  const fetch = async() => {
    const response = await axios.get("https://bookipidea-mern.onrender.com/api/v1/get-order-history",
     {headers}
    );
    setOrderHistory(response.data.data);
    console.log(response.data.data);
  };
  fetch();
  },[location]);

  return (
    <>
    {
      !OrderHistory && (
        <div className = "flex items-center justify-center h-[100%]">
          <Loader/>
        </div>
      )
    }
  
    {
      OrderHistory && OrderHistory.length === 0 && (
        <div className = "h-[80vh] p-4 text-zinc-100">
          <div className = "h-[100%] flex-flex-col items-center justify-center">
            <h1 className = "text-3xl font-semibold text-zinc-500 mb-8">
            Oops! Nothing Ordered Yet
            </h1>
            <img 
            src = "https://cdn0.iconfinder.com/data/icons/empty-state-vol-1-flat/64/16_empty_box_state_package_no_data_nothing-512.png"
            alt= "no orders"
            className = "mx-auto mb-4 mt-4 h-[70vh] my-4 animate-pulse"
            />
          </div>
        </div>
      )
    }
    {
      OrderHistory && OrderHistory.length>0 
      && (
        <div className = "h-[100%] p-0 mx-6 md:p-4 text-zinc-100 " >
          <h1 className = "text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className  = "mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex ">
            <div className = "w-[3%]">
              <h1 className = "text-center">Sr.</h1>
            </div>
            <div className = "w-[22%]">
              <h1 className = "">Books</h1>
            </div>
            <div className = "w-[45%]">
              <h1 className = "">Description</h1>
            </div>
            <div className = "w-[9%]">
              <h1 className = "">Price</h1>
            </div>
            <div className = "w-[16%]">
              <h1 className = "">Status</h1>
            </div>
            <div className = "w-none md:w-[5%] hidden md:block">
              <h1 className = "">Mode</h1>
            </div>
          </div>
          {
            OrderHistory.map((items,i)=>(
              <div className = "bg-zinc-800 w-full rounded py-2 px-2 flex gap-4 hover:bg-zinc-950 hover:cursor-pointer transition-all duration-300">
                <div className = "w-[3%]">
                  <h1 className = "text-center">{i+1}</h1>
                </div>
                <div className = "w-[22%]">
                  <Link
                  to = {`/view-book-details/${items.book._id}`}
                  className = "hover:text-blue-300"
                  >
                    {items.book.title}
                  </Link>
                </div>
                <div className = "w-[45%]">
                  <h1 className = ""> {items.book.description.slice(0,50)}...</h1>
                </div>
                <div className = "w-[9%]">
                  <h1 className = "">{items.book.price}</h1>
                </div>
                <div className = "w-[16%]">
                  <h1 className = "font-semibold text-green-500">
                    {items.status === "Order Placed" ? (
                      <div className = "text-yellow-500">{items.status}</div>
                    ): items.status ==="Canceled" ? (
                      <div className = "text-red-500">{items.status}</div>
                    ):(
                      items.status
                    )
                    }
                  </h1>
                </div>
                <div className = "w-none md:w-[5%] hidden md:block">
                  <h1 className = "text-sm text-zinc-400">COD</h1>
                </div> 
              </div>
            ))
          }
        </div>
      )
    }
    </>
  );
};

export default OrderHistory; 