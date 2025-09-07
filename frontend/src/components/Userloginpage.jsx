import React,{useState} from 'react';
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';

const Userloginpage = () => {
    const [formData, setFormData] = useState({ email: '', password: ''});
    const navigate = useNavigate();
  
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      if(!formData.email){
        toast.error("Please fill Email")
      }
      if(!formData.password){
        toast.error("Please fill Password")
      }

      try {
        const res = await axios.post('http://localhost:5000/api/v1/user/auth/login', formData);
        toast.success("Logged in Successfuly");
        //window.alert('Logged in Successfuly')
        localStorage.setItem('token', res.data.token);
        console.log(res.data.token);
        navigate('/');
      } catch (error) {
        if(error.response){
          if(error.response.status === 404){
            //window.alert("User not Found, Register first ");
            toast.error("User not Found, Register first ");
          }
          else if(error.response.status === 401){
            //window.alert("Invalid Password");
            toast.error("Invalid Password");
          }
          else{
            toast.error(error.response?.data?.error || "Login Faild")
          }
        }
      }
    };
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
            name="email"
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
            name="password"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      
        <div className="flex justify-end mb-6">
          <Link to="#" className="text-blue-500 hover:underline text-sm">
            Forgot password?
          </Link>
        </div>
        
        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300">
          Login
        </button>
        <p className="text-center text-gray-500 text-sm mt-6">
          Not registered yet?{" "}
          <Link to="/register-user" className="text-blue-500 hover:underline font-medium">
            Register as User
          </Link>
        </p>
      </form>
        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-400" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-400" />
        </div>

        <div className='text-center'>
          <Link to="/login-artist" className="text-blue-500 hover:underline font-medium">
            Login as Artist / 
          </Link>
          <Link to="/adminlogin" className="text-blue-500 hover:underline font-medium">
          {" "}Admin
          </Link>
        </div>
      </div>
    </div>
    </div>
    );
};


export default Userloginpage;