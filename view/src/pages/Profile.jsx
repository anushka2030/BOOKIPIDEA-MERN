import React, { useState, useEffect } from "react"; 
import { Outlet } from "react-router-dom"; 
import Loader from "../components/Loader/Loader";
import SideBar from "../components/Profile/SideBar";
import MobileNav from "../components/Profile/MobileNav";
import axios from "axios";


const Profile = () => {
  const [profile, setProfile] = useState([null]); 

  // Define headers
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfile(response.data); // Set the profile data
      } catch (error) {
        console.error("Error fetching profile data:", error); // Handle errors
      }
    };

    fetchProfile();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4">
      {!profile ? ( // Conditional rendering for loader
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ):(
        <>
          <div className="w-full h-auto lg:h-screen mb-3 md:w-2/6 ">
            <SideBar data={profile} /> {/* Pass the profile data to Sidebar */}
           <div className = "flex lg:hidden">
           <MobileNav/>
           </div>
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
