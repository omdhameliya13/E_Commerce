import React,{useState} from "react";
import { Lock, User } from "lucide-react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Adminlogin = () => {
  
  const[formData,setFormData] = useState({email:'',password:''});
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData,[e.target.name]:e.target.value});

  const handleSubmit = async(e)=>{
    e.preventDefault();

    if(!formData.email){
      window.alert("Please fill Email")
    }
    if(!formData.password){
      window.alert("Please fill Password")
    }

    try {
      const res = await axios.post("http://localhost:5000/api/v1/admin/auth/login",formData);
      localStorage.setItem('token',res.data.token);
      toast.success("Admin Login Successfully");
      navigate("/admindashboard")
    } catch (error) {
      if(error.response){
        if(error.response.status === 404){
          toast.error("User not Found, Register first ");
        }
        else if(error.response.status === 401){
          toast.error("Invalid Password");
        }
        else{
          toast.error(error.response?.data?.error || "Login Faild");
        }
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Admin Login
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <User className="text-gray-400 ml-2" size={18} />
              <input
                type="email"
                placeholder="admin@example.com"
                name="email"
                onChange={handleChange}
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
                name="password"
                onChange={handleChange}
                className="flex-1 px-2 py-2 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow-md transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/adminsignup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Adminlogin;
