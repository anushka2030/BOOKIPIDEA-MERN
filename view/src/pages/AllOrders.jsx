import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from "../components/Loader/Loader";
import { Link } from 'react-router-dom';

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState();
  const [loading, setLoading] = useState(false);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://bookipidea-mern.onrender.com/api/v1/get-all-orders", {
          headers
        });
        setAllOrders(response.data.data);
        console.log("Fetched Orders:", response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    setLoading(true);
    try {
      await axios.put(
        `https://bookipidea-mern.onrender.com/api/v1
/update-status/${orderId}`,
        { status: newStatus },
        { headers }
      );

      setAllOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      console.log("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "text-yellow-500";
      case "Out for delivery":
        return "text-blue-500";
      case "Delivered":
        return "text-green-500";
      case "Canceled":
        return "text-red-500";
      default:
        return "text-zinc-400";
    }
  };

  return (
    <>
      {!allOrders && (
        <div className="flex items-center justify-center h-[100%]">
          <Loader />
        </div>
      )}

      {allOrders && allOrders.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold text-zinc-500 mb-8">
              No Orders Found
            </h1>
            <img
              src="https://cdn0.iconfinder.com/data/icons/empty-state-vol-1-flat/64/16_empty_box_state_package_no_data_nothing-512.png"
              alt="no orders"
              className="mx-auto mb-4 mt-4 h-[70vh] my-4 animate-pulse"
            />
          </div>
        </div>
      )}

      {allOrders && allOrders.length > 0 && (
        <div className="h-[100%] p-0 mx-6 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders Management
          </h1>

          {/* Header Row */}
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 hidden md:flex">

            <div className="w-[3%] text-center">Sr.</div>
            <div className="w-[15%]">User</div>
            <div className="w-[20%]">Books</div>
            <div className="w-[25%]">Description</div>
            <div className="w-[8%]">Price</div>
            <div className="w-[12%]">Status</div>
            <div className="w-[12%]">Actions</div>
            <div className="w-none md:w-[5%] hidden md:block">Mode</div>
          </div>

          {/* Order Rows */}
          {allOrders.map((order, i) => (
            <div
              key={order._id}
              className="bg-zinc-800 w-full rounded py-4 px-4 flex flex-col md:flex-row gap-4 md:items-center hover:bg-zinc-950 transition-all duration-300 mt-2">
              <div className="w-full md:w-[5%] text-sm">
                 <span className="block md:hidden text-zinc-400 text-xs mb-1">#</span>
                {i + 1}</div>

             <div className="w-full md:w-[12%] text-sm">
  <span className="block md:hidden text-zinc-400 text-xs mb-1">User</span>
  {order.user ? order.user.username || order.user.email : 'N/A'}
</div>


               <div className="w-full md:w-[20%] text-sm">
    <span className="block md:hidden text-zinc-400 text-xs mb-1">Book</span>
    {order.book ? (
      <Link to={`/view-book-details/${order.book._id}`} className="hover:text-blue-300">
        {order.book.title}
      </Link>
    ) : (
      <span className="text-red-400">Book Deleted</span>
    )}
  </div>

                <div className="w-full md:w-[25%] text-sm">
    <span className="block md:hidden text-zinc-400 text-xs mb-1">Description</span>
    {order.book?.description ? order.book.description.slice(0, 40) + '...' : 'N/A'}
  </div>


 <div className="w-full md:w-[8%] text-sm">
    <span className="block md:hidden text-zinc-400 text-xs mb-1">Price</span>
    {order.book ? `₹${order.book.price}` : 'N/A'}
  </div>


               <div className="w-full md:w-[12%] font-semibold text-sm">
    <span className="block md:hidden text-zinc-400 text-xs mb-1">Status</span>
    <span className={getStatusColor(order.status)}>
      {order.status}
    </span>
  </div>

              <div className="w-full md:w-[12%]">
    <span className="block md:hidden text-zinc-400 text-xs mb-1">Actions</span>
    <select
      value={order.status}
      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
      disabled={loading}
      className="bg-zinc-700 text-white text-xs p-1 rounded border border-zinc-600 focus:outline-none focus:border-yellow-500 w-full"
    >
      <option value="Order Placed">Order Placed</option>
      <option value="Out for delivery">Out for delivery</option>
      <option value="Delivered">Delivered</option>
      <option value="Canceled">Canceled</option>
    </select>
  </div>

              <div className="w-full md:w-[5%] hidden md:block text-xs text-zinc-400">
    COD
  </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AllOrders;
