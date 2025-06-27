import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {authActions} from "../store/auth";
import axios from "axios";
import { useDispatch } from "react-redux";

const LogIn = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    if (values.password.trim().length < 6) {
      alert("Password must be at least 6 characters long!");
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
        "https://bookipidea-mern.onrender.com/api/v1/sign-in",
        values
      );
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));

      localStorage.setItem("id",response.data.id);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("role",response.data.role);

      alert("Login Successful!");
      // Navigate to the homepage or another page upon successful login
      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="mb-14 bg-neutral-950 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Log In</p>
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
              <button
                type="submit"
                className="w-full bg-yellow-700 text-white font-semibold py-2 rounded hover:bg-yellow-500"
              >
                Log In
              </button>
            </div>
          </form>

          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold gap-2">
            Don't have an account?
            <Link className="text-zinc-500 hover:underline" to="/signup">
              Sign Up Here
            </Link>
          </p>

          {/* Forgot Password Link
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold gap-2">
            Forgot your password? 
            <Link className="text-zinc-500 hover:underline" to="/forgot-password">
              Reset it here
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default LogIn;
