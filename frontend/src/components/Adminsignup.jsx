import React from "react";
import { Lock, User, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Adminsignup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
         Sign Up
        </h1>

        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <User className="text-gray-400 ml-2" size={18} />
              <input
                type="text"
                placeholder="Admin Name"
                className="flex-1 px-2 py-2 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <Mail className="text-gray-400 ml-2" size={18} />
              <input
                type="email"
                placeholder="admin@example.com"
                className="flex-1 px-2 py-2 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <Lock className="text-gray-400 ml-2" size={18} />
              <input
                type="password"
                placeholder="********"
                className="flex-1 px-2 py-2 outline-none"
              />
            </div>
          </div>
          <Link to="/adminlogin">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md transition w-full">
                Sign Up
            </button>
          </Link>

        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/adminlogin" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Adminsignup;
