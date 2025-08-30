import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import axios from "axios";

const AllOrders = () => {
  
  /*const orders = [
    { code: "SHOE-001", company: "Nike", qty: 2, price: 2500, total: 5000, status: "Complete" },
    { code: "SHOE-002", company: "Adidas", qty: 1, price: 3000, total: 3000, status: "Pending" },
    { code: "SHOE-003", company: "Puma", qty: 3, price: 2000, total: 6000, status: "Complete" },
    { code: "SHOE-004", company: "Reebok", qty: 1, price: 3500, total: 3500, status: "Pending" },
  ];*/

  const [order,setOrders] = useState([]);
  const token = localStorage.getItem('token');
  useEffect = (()=>{
    const fetchOrders = async() =>{
      try {
        if(!token){
          window.alert("No token, Please Login again");
          return;
        }
        const res = await axios.get("http://localhost:5000/api/v1/artist/orders/getOrders",
          {headers: {Authorization : `Bearer ${token}`}}
        )
        setOrders(Array.isArray(res.data)?res.data:[]);
      } catch (error) {
        console.log(error.response?.data?.error || error.message);
        window.alert("Error to Fatch Orders");
        setOrders([])
      }
    }
    fetchOrders();
  },[token])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Orders</h1>

        <div className="flex gap-3">
          {/* Dashboard Button */}
          <Link to="/artistdashboard">
            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition">
              Dashboard
            </button>
          </Link>

          {/* Logout Button */}
          <Link to="/login-user">
            <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition">
              <LogOut size={18} />
              Logout
            </button>
          </Link>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Product Name</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Qty</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {order.length > 0 ? (
              order.map((or) => (
              <tr
                key={or._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{or.fullname}</td>
                <td className="px-4 py-3">{or.mobileno}</td>
                <td className="px-4 py-3">{or.quantity}</td>
                <td className="px-4 py-3">₹{or.price}</td>
                <td className="px-4 py-3">₹{or.total}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      or.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {or.status}
                  </span>
                </td>
              </tr>
            ))):(
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No orders found
                </td>
              </tr>
            )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
