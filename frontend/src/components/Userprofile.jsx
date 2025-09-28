import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');
  useEffect(() => {
    
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/user/profile/getProfile",
           {
            headers:{Authorization:`Bearer ${token}`}
           }
        );
        setUser(res.data);
      } catch (error) {
        console.log(error.response?.data?.error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login-user");
    
  };

  const handleLogin = () => {
    navigate("/login-user");
    toast.success("Redirecting to login...");
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h2>

      {user ? (
        <>
          <div className="mb-4 text-left">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              value={user.name}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6 text-left">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="text"
              value={user.email}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default UserProfile;
