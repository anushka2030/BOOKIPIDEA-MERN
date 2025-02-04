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
    links.splice(3, 2);
  }
  if(isLoggedIn == true && role == "admin"){
    links.splice(3,2);
  }
  if(isLoggedIn == true && role == "user"){
    links.splice(5,1);
  }

  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="z-50 relative flex bg-neutral-950 text-orange-100 px-8 py-3 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-9 me-3"
            src="https://img.icons8.com/?size=100&id=48366&format=png&color=FFFFFF"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold text-yellow-600">
            BookiPedia
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links-bookstore block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <Link
                to={items.link}
                className={`${
                  items.title === "Profile" || items.title === "Admin Profile"
                    ? "hover:text-yellow-400 border border-yellow-200 rounded-full px-2 transition-all duration-300"
                    : "hover:text-yellow-400 transition-all duration-300"
                }`}
                key={i}
              >
                {items.title}
              </Link>
            ))}
          </div>

          {/* LogIn/SignUp Buttons */}
          {!isLoggedIn && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/LogIn"
                className="px-5 py-1 mb-3 mt-1 border border-yellow-600 rounded-full hover:bg-zinc-100 hover:text-zinc-800 transition-all duration-300 text-xl font-semibold text-yellow-100"
              >
                LogIn
              </Link>
              <Link
                to="/SignUp"
                className="px-5 py-1 mb-3 mt-1 bg-yellow-600 rounded-full hover:bg-yellow-100 hover:text-zinc-800 transition-all duration-300 text-xl font-semibold"
              >
                SignUp
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Menu */}
          <button
            className="flex md:hidden text-white text-2xl hover:text-zinc-400"
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
        className={`${MobileNav} bg-zinc-600 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className="hover:text-yellow-400 text-4xl mb-4 font-semibold transition-all duration-300"
            key={i}
            onClick={() =>
              setMobileNav(MobileNav === "hidden" ? "block" : "hidden")
            }
          >
            {items.title}
          </Link>
        ))}
        {!isLoggedIn && (
          <>
            <Link
              to="/LogIn"
              className="px-6 py-1 mb-3 mt-1 border border-yellow-600 rounded-full hover:bg-zinc-100 hover:text-zinc-800 transition-all duration-300 text-xl font-semibold text-yellow-100"
            >
              LogIn
            </Link>
            <Link
              to="/SignUp"
              className="px-5 py-1 mb-3 mt-1 bg-yellow-600 rounded-full hover:bg-yellow-100 hover:text-zinc-800 transition-all duration-300 text-xl font-semibold"
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
