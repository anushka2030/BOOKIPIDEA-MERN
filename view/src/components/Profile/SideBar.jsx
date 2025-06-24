import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth";

const SideBar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    try {
      // Dispatch redux actions
      dispatch(authActions.logout());
      dispatch(authActions.changeRole("user"));
      
      // Clear localStorage items
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      
      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally add error handling here
    }
  };

  return (
    <div className="bg-gradient-to-tl from-yellow-800 via-yellow-500 to-yellow-800 p-4 rounded flex-col flex items-center justify-between h-auto lg:h-[100%] lg:w-4/6 w-full">
      {/* Profile Information */}
      <div className="flex items-center flex-col justify-center">
        <img src={data.avatar} alt="Avatar" className="h-[12vh] rounded-full" /> {/* Added alt attribute */}
        <p className="mt-3 text-xl text-zinc-100 font-semibold">{data.username}</p>
        <p className="mt-1 text-sm text-zinc-300">{data.email}</p>
        {/* <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div> */}
      </div>

      {/* Navigation Links */}
      {role === "user" &&
      <div className="w-full items-center justify-center lg:flex flex-col hidden">
      <Link
        to="/profile"
        className="text-zinc-800 font-semibold w-full py-2 text-center hover:bg-zinc-300 rounded transition-all duration-300"
      >
        Favourites
      </Link>
      <Link
        to="/profile/orderHistory"
        className="text-zinc-800 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-300 rounded transition-all duration-300"
      >
        Order History
      </Link>
      <Link
        to="/profile/settings"
        className="text-zinc-800 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-300 rounded transition-all duration-300"
      >
        Settings
      </Link>
    </div>
      }
      {
        role === "admin" && 
        <div className="w-full items-center justify-center lg:flex flex-col hidden">
        <Link
          to="/profile"
          className="text-zinc-800 font-semibold w-full py-2 text-center hover:bg-zinc-300 rounded transition-all duration-300"
        >
          All Orders
        </Link>
        <Link
          to="/profile/add-book"
          className="text-zinc-800 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-300 rounded transition-all duration-300"
        >
          Add Book
        </Link>
      </div>
      }

      {/* Logout Button */}
      <button className="bg-zinc-800 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300"
      onClick = {handleLogout}
      >
        Log Out <FaArrowRightFromBracket className="ml-2" /> {/* Fixed className */}
      </button>
    </div>
  );
};

export default SideBar;
