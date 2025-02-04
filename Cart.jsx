import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import {useNavigate} from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();

  const [Cart, setCart] = useState(null); // Initialize as null to show loader initially
  const [Total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch the cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
        setCart(res.data.data);
        calculateTotal(res.data.data); // Calculate total cost
      } catch (error) {
        console.error("Error fetching cart:", error.response?.data || error.message);
        alert("Failed to fetch the cart. Please try again.");
      }
    };
    fetchCart();
  }, []);

  // Calculate the total price of items in the cart
  const calculateTotal = (cart) => {
    const total = cart.reduce((acc, item) => acc + item.price, 0); // reduce: JS array method
    setTotal(total);
  };

  const PlaceOrder = async()=>{
    try{
       const response = await axios.post(
        `http://localhost:1000/api/v1/place-order`,
        {order: Cart},
        {headers}
       );
       alert(response.data.message);
       navigate("/profile/orderHistory", {state:{refresh: true}});
    }
    catch(error){
      console.log(error.response?.data || error.message);
    }
  };

  // Remove an item from the cart
  const deleteItem = async (bookid) => {
    try {
      await axios.put(`http://localhost:1000/api/v1/remove-from-cart/${bookid}`, {}, { headers });
      const updatedCart = Cart.filter((item) => item._id !== bookid);
      setCart(updatedCart);
      calculateTotal(updatedCart);
      alert("Item removed from the cart.");
    } catch (error) {
      console.error("Error deleting item:", error.response?.data || error.message);
      alert("Failed to delete the item. Please try again.");
    }
  };

  return (
    <>
      {!Cart ? (
        <div className = "bg-zinc-950 w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : Cart.length === 0 ? (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col bg-zinc-900">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">Empty Cart</h1>
            <img src="./public/delete.png" alt="Empty Cart" className="lg:h-[50vh]" />
          </div>
        </div>
      ) : (
        <div className = "h-screen bg-yellow-100">
             <h1 className="text-5xl font-semibold text-zinc-500 mb-8">Your Cart</h1>
       
       {Cart.map((item, i) => (
         <div
           className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
           key={i}
         >
           <img src={item.url} alt="/" className="h-[20vh] md:h-[10vh] object-cover" />
           <div className="w-full md:w-auto">
             <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
               {item.title}
             </h1>
             <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
               {item.description.slice(0, 100)}...
             </p>
             <p className="text-normal text-zinc-300 mt-2 block md:hidden">
               {item.description.slice(0, 65)}...
             </p>
           </div>
           <div className="flex mt-4 w-full md:w-auto items-center justify-between">
             <h2 className="text-zinc-100 text-3xl font-semibold flex">Rs {item.price}</h2>
             <button
               className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
               onClick={() => deleteItem(item._id)}
             >
               <AiFillDelete />
             </button>
           </div>
         </div>
       ))}
       {Cart && Cart.length>0 && (
        <div className = "bg-zinc-800 rounded mt-4">
          <div className = "flex flex-col gap-4">
            <h1 className = "text-2xl font-semibold text-zinc-100">
              Total Amount
            </h1>
            <div className = "flex justify-between text-zinc-300">
              <h2>{Cart.length}Books</h2>
              <h2>Rs {Total}</h2>
            </div> 
            <div className = "flex justify-end">
              <button className = "bg-yellow-600 text-zinc-900 px-6 py-2 rounded font-semibold hover:bg-yellow-400" onClick={PlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>
       )}
       </div>
   )};
  </>
);
};

export default Cart;
