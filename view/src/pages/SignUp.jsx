import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Validate input
  const validateInput = () => {
    if (values.username.trim().length < 4) {
      alert("Username must be at least 4 characters long!");
      return false;
    }
    if (!values.email.includes("@") || !values.email.includes(".")) {
      alert("Please enter a valid email address!");
      return false;
    }
    if (values.password.trim().length < 6) {
      alert("Password must be at least 6 characters long!");
      return false;
    }
    if (values.address.trim() === "") {
      alert("Address cannot be empty!");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    try {
      const response = await axios.post(
        "https://bookipidea-mern.onrender.com/api/v1/sign-up",
        values
      );
      alert(response.data.message || "SignUp Successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="mb-14 bg-neutral-950 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>
        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="text-zinc-400">
                Username
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-1"
                placeholder="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="email" className="text-zinc-400">
                Email
              </label>
              <input
                type="email"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-1"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="password" className="text-zinc-400">
                Password
              </label>
              <input
                type="password"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-1"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="address" className="text-zinc-400">
                Address
              </label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-1"
                placeholder="Address"
                name="address"
                value={values.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-yellow-700 text-white font-semibold py-2 rounded hover:bg-yellow-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold gap-2">
            Already have an account?
            <Link className="text-zinc-500 hover:underline" to="/login">
              Log In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

