import React from 'react';
import { Link } from "react-router-dom";

const Userloginpage = () => {
    return(
        <div>
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="bg-slate-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
    
        <div className="mb-4">
          <label htmlFor="email" className="block text-white font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-white font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end mb-6">
          <Link to="#" className="text-blue-500 hover:underline text-sm">
            Forgot password?
          </Link>
        </div>
        <Link to="/">
        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300">
          Login
        </button>
        </Link>
        <p className="text-center text-gray-500 text-sm mt-6">
          Not registered yet?{" "}
          <Link to="/register-user" className="text-blue-500 hover:underline font-medium">
            Register as User
          </Link>
        </p>

        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-400" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-400" />
        </div>

        <div className='text-center'>
          <Link to="/login-artist" className="text-blue-500 hover:underline font-medium">
            Login as Artist
          </Link>
        </div>
      </div>
    </div>
        </div>
    );
};


export default Userloginpage;