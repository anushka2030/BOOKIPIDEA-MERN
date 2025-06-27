// pages/ForgotPassword.js
import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://bookipidea-mern.onrender.com/api/v1/forgot-password", { email });
      setMessage("Check your email for the reset link!");
    } catch (error) {
      console.log(error);
      setMessage("Error: " + error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-neutral-950 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Forgot Password</p>
        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="text-zinc-400">Email</label>
              <input
                type="email"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-1"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-yellow-700 text-white font-semibold py-2 rounded hover:bg-yellow-500"
              >
                Send Reset Link
              </button>
            </div>
          </form>
          {message && <p className="mt-4 text-center text-zinc-200 font-semibold">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
