import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try {
         await axios.post(
        `https://bookipidea-mern.onrender.com/api/v1
/reset-password/${token}`,
        { newPassword }
      );
      setMessage('Password reset successful!');
      // Redirect to login page after successful password reset
      history.push('/login');
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.error || 'Something went wrong'));
    }
  };

  return (
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-neutral-950 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Reset Password</p>
        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="newPassword" className="text-zinc-400">New Password</label>
              <input
                type="password"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-1"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="confirmPassword" className="text-zinc-400">Confirm Password</label>
              <input
                type="password"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-1"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-yellow-700 text-white font-semibold py-2 rounded hover:bg-yellow-500"
              >
                Reset Password
              </button>
            </div>
          </form>
          {message && <p className="mt-4 text-center text-zinc-200 font-semibold">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
