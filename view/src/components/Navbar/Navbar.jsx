import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  
 if (!isLoggedIn) {
  // Remove "Cart", "Profile", "Admin Profile"
  links.splice(3, 3);
} else if (role === "admin") {
  // Remove "Cart" and "Profile" for admin
  links.splice(3, 2);
} else if (role === "user") {
  // Remove "Admin Profile" at index 5
  links.splice(5, 1);
}

  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="z-30 relative flex bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-orange-100 px-8 py-3 items-center justify-between shadow-lg">
        <Link to="/" className="flex items-center group">
          <div className="relative">
            <img
              className="h-10 me-3 transition-transform duration-300 group-hover:scale-110"
              src="https://img.icons8.com/?size=100&id=48366&format=png&color=FFFFFF"
              alt="logo"
            />
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent group-hover:from-yellow-400 group-hover:to-orange-400 transition-all duration-300">
            BOOKIPEDIA
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links-bookstore block md:flex items-center gap-4">
          <div className="hidden md:flex gap-6">
            {links.map((items, i) => (
              <Link
                to={items.link}
                className={`${
                  items.title === "Profile" || items.title === "Admin Profile"
                    ? "relative px-4 py-2 border border-yellow-600/50 rounded-full hover:border-yellow-400 hover:bg-yellow-600/10 hover:text-yellow-400 transition-all duration-300 font-medium backdrop-blur-sm"
                    : "relative px-3 py-2 hover:text-yellow-400 transition-all duration-300 font-medium group"
                } overflow-hidden`}
                key={i}
              >
                {items.title !== "Profile" && items.title !== "Admin Profile" && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-600 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                )}
                <span className="relative z-10">{items.title}</span>
              </Link>
            ))}
          </div>

          {/* LogIn/SignUp Buttons */}
          {!isLoggedIn && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/LogIn"
                className="relative px-6 py-2 border border-yellow-600/70 rounded-full hover:border-yellow-400 hover:bg-gradient-to-r hover:from-yellow-600/20 hover:to-orange-600/20 hover:text-yellow-100 transition-all duration-300 text-lg font-semibold text-yellow-200 backdrop-blur-sm overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-600/0 to-orange-600/0 group-hover:from-yellow-600/10 group-hover:to-orange-600/10 transition-all duration-300"></span>
                <span className="relative z-10">LogIn</span>
              </Link>
              <Link
                to="/SignUp"
                className="relative px-6 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full hover:from-yellow-500 hover:to-orange-500 hover:shadow-lg hover:shadow-yellow-600/25 transition-all duration-300 text-lg font-semibold text-white overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-orange-400/0 group-hover:from-yellow-400/20 group-hover:to-orange-400/20 transition-all duration-300"></span>
                <span className="relative z-10">SignUp</span>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Menu */}
          <button
            className="flex md:hidden text-white text-2xl hover:text-yellow-400 transition-colors duration-300 p-2 rounded-lg hover:bg-neutral-800/50"
            onClick={() =>
              setMobileNav(MobileNav === "hidden" ? "block" : "hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`${MobileNav} bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center backdrop-blur-md`}
      >
        {/* Close button for mobile menu */}
        <button
          className="absolute top-6 right-8 text-white text-3xl hover:text-yellow-400 transition-colors duration-300"
          onClick={() => setMobileNav("hidden")}
        >
          ×
        </button>
        
        {/* Mobile brand */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            BOOKIPEDIA
          </h1>
        </div>

        {links.map((items, i) => (
          <Link
            to={items.link}
            className="relative text-slate-200 hover:text-yellow-400 text-2xl mb-6 font-semibold transition-all duration-300 px-6 py-3 rounded-lg hover:bg-neutral-700/30 group"
            key={i}
            onClick={() => setMobileNav("hidden")}
          >
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-yellow-600 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
            <span className="relative z-10">{items.title}</span>
          </Link>
        ))}
        
        {!isLoggedIn && (
          <div className="flex flex-col gap-4 mt-6">
            <Link
              to="/LogIn"
              className="px-8 py-3 border border-yellow-600/70 rounded-full hover:border-yellow-400 hover:bg-yellow-600/20 hover:text-yellow-100 transition-all duration-300 text-xl font-semibold text-yellow-200 text-center"
              onClick={() => setMobileNav("hidden")}
            >
              LogIn
            </Link>
            <Link
              to="/SignUp"
              className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full hover:from-yellow-500 hover:to-orange-500 hover:shadow-lg hover:shadow-yellow-600/25 transition-all duration-300 text-xl font-semibold text-white text-center"
              onClick={() => setMobileNav("hidden")}
            >
              SignUp
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;