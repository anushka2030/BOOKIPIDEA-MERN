import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { AiFillDelete, AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();

  const [Cart, setCart] = useState(null);
  const [Total, setTotal] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

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
        calculateTotal(res.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error.response?.data || error.message);
        alert("Failed to fetch the cart. Please try again.");
      }
    };
    fetchCart();
  }, []);

  // Calculate the total price of items in the cart
  const calculateTotal = (cart) => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    setTotal(total);
  };

  const PlaceOrder = async() => {
    setIsPlacingOrder(true);
    try {
      const response = await axios.post(
        `http://localhost:1000/api/v1/place-order`,
        {order: Cart},
        {headers}
      );
      alert(response.data.message);
      navigate("/profile/orderHistory", {state:{refresh: true}});
    } catch(error) {
      console.log(error.response?.data || error.message);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
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
    <div className="min-h-screen bg-zinc-950">
      {!Cart ? (
        <div className="bg-zinc-950 w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : Cart.length === 0 ? (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="mb-8">
              <AiOutlineShoppingCart className="text-zinc-600 text-8xl mx-auto mb-4" />
              <h1 className="text-4xl lg:text-5xl font-bold text-zinc-400 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-zinc-500 text-lg">
                Add some books to get started with your order
              </p>
            </div>
            <button 
              onClick={() => navigate('/all-books')}
              className="bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
            >
              Browse Books
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-zinc-950 p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-yellow-500 mb-2">
                Shopping Cart
              </h1>
              <p className="text-zinc-400 text-lg">
                {Cart.length} {Cart.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {Cart.map((item, i) => (
                  <div
                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors duration-200"
                    key={i}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Book Image */}
                      <div className="flex-shrink-0">
                        <img 
                          src={item.url} 
                          alt={item.title}
                          className="h-32 w-24 object-cover rounded-lg border border-zinc-700"
                        />
                      </div>
                      
                      {/* Book Details */}
                      <div className="flex-grow">
                        <h2 className="text-xl font-semibold text-zinc-100 mb-2">
                          {item.title}
                        </h2>
                        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                          {item.description.slice(0, 120)}...
                        </p>
                        
                        {/* Price and Actions */}
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-yellow-500">
                            ₹{item.price.toLocaleString()}
                          </div>
                          <button
                            className="bg-red-900 hover:bg-red-800 text-red-100 p-3 rounded-lg transition-colors duration-200 group"
                            onClick={() => deleteItem(item._id)}
                            title="Remove from cart"
                          >
                            <AiFillDelete className="text-lg group-hover:scale-110 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-4">
                  <h2 className="text-2xl font-bold text-zinc-100 mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-zinc-300">
                      <span>Items ({Cart.length})</span>
                      <span>₹{Total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Shipping</span>
                      <span className="text-green-400">Free</span>
                    </div>
                    <hr className="border-zinc-700" />
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-zinc-100">Total</span>
                      <span className="text-yellow-500">₹{Total.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                      isPlacingOrder
                        ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                        : 'bg-yellow-500 hover:bg-yellow-400 text-zinc-950 hover:shadow-lg hover:shadow-yellow-500/25'
                    }`}
                    onClick={PlaceOrder}
                    disabled={isPlacingOrder}
                  >
                    {isPlacingOrder ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
                        Placing Order...
                      </div>
                    ) : (
                      'Place Order'
                    )}
                  </button>

                  <p className="text-zinc-500 text-sm text-center mt-4">
                    Secure checkout • Free shipping on all orders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;