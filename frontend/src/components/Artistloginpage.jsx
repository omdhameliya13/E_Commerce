import React,{useState} from 'react';
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';

const Artistloginpage = () => {
    const [formData, setFormData] = useState({ email: '', password: ''});
        const navigate = useNavigate();
      
        const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          if (!formData.email || !formData.password) {
            //return toast.error('All fields are required');
            window.alert('All fields are required');
          }
          try {
            const res = await axios.post('http://localhost:5000/api/v1/artist/auth/login', formData);
            //toast.success(res.data.message);
            window.alert('Logged in Successfuly')
            localStorage.setItem('token', res.data.token);
            console.log(res.data.token);
            navigate('/artistdashboard');
          } catch (err) {
            console.log(err.response?.data?.error)
            window.alert("Login failed",err.response?.data?.error);
            //toast.error(err.response?.data?.error || 'Login failed');
          }
    }
    return(
        <div>
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="bg-slate-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            name='email'
            onChange={handleChange}
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
            name='password'
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end mb-6">
          <a href="#" className="text-blue-500 hover:underline text-sm">
            Forgot password?
          </a>
        </div>
        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300">
          Login
        </button>
      
        <p className="text-center text-gray-500 text-sm mt-6">
          Not registered yet?{" "}
          <Link to="/register-artist" className="text-blue-500 hover:underline font-medium">
            Register now as Artist!
          </Link>
        </p>
        </form>
      </div>
    </div>
    </div>
    );
};


export default Artistloginpage;