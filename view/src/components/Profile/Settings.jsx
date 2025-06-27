import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from "../Loader/Loader";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    try {
      const { name, value: inputValue } = e.target;
      setValue(prevState => ({
        ...prevState,
        [name]: inputValue
      }));
    } catch (error) {
      console.error("Error updating form:", error);
      setError("Failed to update form field");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bookipidea-mern.onrender.com/api/v1/get-user-information",
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
      }
    };

    fetchData();
  }, []);

  const submitAddress = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage("");

      const response = await axios.put(
        "https://bookipidea-mern.onrender.com/api/v1/update-address",
        value,
        { headers }
      );

      setSuccessMessage("Address updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error updating address:", error);
      setError(error.response?.data?.message || "Failed to update address");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!profileData && <Loader />}
      {profileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded mb-4">
              {successMessage}
            </div>
          )}

          <div className="flex gap-12">
            <div className="">
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.username}
              </p>
            </div>
            <div className="">
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col">
            <label htmlFor="address">Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              placeholder="Address"
              name="address"
              value={value.address}
              onChange={change}
              disabled={isSubmitting}
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              className={`bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={submitAddress}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;