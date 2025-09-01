import React,{useState} from "react";
import { Lock, User, Mail } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const Adminsignup = () => {

  const[formData,setFormData] = useState({name:'',email:'',password:''});
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData,[e.target.name]:e.target.value});
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!formData.name){
      toast.error("Please fill Username")
    }
    if(!formData.email){
      toast.error("Please fill Email")
    }
    if(!formData.password){
      toast.error("Please fill Password")
    }
    try {
      const res = await axios.post("http://localhost:5000/api/v1/admin/auth/register",formData);
      toast.success("Signup Successfully");
      navigate("/adminlogin");
    } catch (error) {
      if(error.response){
        if(error.response.status === 400){
           toast.error("User already registered with this email");
        }
        else{
          console.log(error);
          toast.error(error.response?.data?.error ||"Signup Faild");
        }
      }
    }
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
         Sign Up
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <User className="text-gray-400 ml-2" size={18} />
              <input
                type="text"
                placeholder="Admin Name"
                name="name"
                onChange={handleChange}
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
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md transition w-full">
                Sign Up
            </button>

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
