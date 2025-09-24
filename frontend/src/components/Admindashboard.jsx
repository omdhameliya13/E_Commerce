import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  PlusCircle,
  Edit,
  Trash2,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const orders = [
    { id: 1, customer: "John Doe", total: "₹5000", status: "Pending" },
    { id: 2, customer: "Jane Smith", total: "₹3000", status: "Completed" },
    { id: 3, customer: "Mike Ross", total: "₹2000", status: "Pending" },
  ];

  const [artist,setArtist] = useState([]);
  const [page,setPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  const [filter,setFilter] = useState("all");
  const token = localStorage.getItem('token');

    useEffect(()=>{
    const fetchArtist = async()=>{
      try {
        if(!token){
          toast.error("token not found, Login first");
          return;
        }
        
        const res = await axios.get(`http://localhost:5000/api/v1/admin/manageArtist/getAllArtist/?page=${page}&limit=5&filter=${filter}`,{
          headers:{Authorization: `Bearer ${token}`}
        });
        console.log("API RESponse",res.data);
        setTotalPages(res.data.totalPages);
        setArtist(res.data.artists);
      } catch (error) {
        console.log(error.response?.data?.error || error.message);
        toast.error("Faild to load Artist");
        setArtist([]);
      }
      
    };
    fetchArtist();
  },[activeTab,token,page,filter]);

  const handleVerify = async(id)=>{
    try {
      const res = await axios.put(`http://localhost:5000/api/v1/admin/manageArtist/verifyArtist/${id}`,{},{
        headers:{Authorization:`Bearer ${token}`}
      });
      setArtist((prev)=>prev.map((a)=> a._id===id ?{ ...a,isverified:true}:a));
      toast.success('Artist Verified');
    } catch (error) {
      console.log(error.res?.data?.error);
      toast.error("Faild to verify Artist");
    }
  }

  const handleReject = async(id) =>{
    try {
      const res = await axios.put(`http://localhost:5000/api/v1/admin/manageArtist/rejectArtist/${id}`,{},{
        headers : {Authorization : `Bearer ${token}`}
      });
      setArtist((prev)=>prev.map((a)=>a._id === id ? { ...a,isverified:false}:a));
      toast.success("Artist Rejected");
      
    } catch (error) {
      console.log(error.res?.data?.error);
      toast.error("Faild to Reject Artist");
    }
  }

  const[products,setProduct] = useState([]);
  const [productPage,setProductPage] = useState(1);
  const [totalProductPages,setTotalProductPages] = useState(1);
  const [productfilter,setProductFilter] = useState("all");

  useEffect(()=>{
    const fetchProduct = async()=>{
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/admin/manageProduct/getAllProduct/?productPage=${productPage}&limit=5&productfilter=${productfilter}`,{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        });
        console.log("API RESponse",res.data);
        setTotalProductPages(res.data.totalPages)
        setProduct(res.data.product);
      } catch (error) {
        console.log(error.response?.data?.error ||error.message);
        toast.error("Unable to fetch Product");
        setProduct([]);
      }
    }
    fetchProduct();
  },[activeTab,token,page,productfilter]);

  const handleApprove = async(id)=>{
    try {
      const res = await axios.put(`http://localhost:5000/api/v1/admin/manageProduct/approveProduct/${id}`,{},{
        headers:{Authorization:`Bearer ${token}`}
      });
      setProduct((prev)=>prev.map((p)=>p._id === id ? { ...p,isapproved:true}:p));
      toast.success("Product Approved Successfully");
    } catch (error) {
      console.log(error.response?.data?.error);
      toast.error("Faild to Approve Product");
    }
  }

  const handleRejectProduct = async(id)=>{
    try {
      const res = await axios.put(`http://localhost:5000/api/v1/admin/manageProduct/rejectProduct/${id}`,{},{
        headers : {Authorization : `Bearer ${token}`}
      });
      setProduct((prev)=>prev.map((p)=>p._id === id ? {...p,isapproved:false} : p));
      toast.success("Product Rejected Successfully");
    } catch (error) {
      console.log(error.res?.data?.error);
      toast.error("Faild to Reject Product");
    }
  }


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Admin Panel
        </h1>

        {/* Sidebar Menu */}
        <nav className="flex flex-col gap-3">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              activeTab === "dashboard"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 text-gray-700"
            }`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>

          {/* Moved Users to second position */}
          <button
            onClick={() => {setActiveTab("users");setPage(1)}}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              activeTab === "users"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 text-gray-700"
            }`}
          >
            <Users size={20} /> Users
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              activeTab === "products"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 text-gray-700"
            }`}
          >
            <Package size={20} /> Products
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              activeTab === "orders"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 text-gray-700"
            }`}
          >
            <ShoppingCart size={20} /> Orders
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              activeTab === "settings"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 text-gray-700"
            }`}
          >
            <Settings size={20} /> Settings
          </button>

          <Link to="/login-user">
          <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-red-600 mt-auto">
            <LogOut size={20} /> Logout
          </button>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-md text-center">
                <h2 className="text-xl font-bold text-blue-600">120</h2>
                <p className="text-gray-600">Total Products</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md text-center">
                <h2 className="text-xl font-bold text-green-600">85</h2>
                <p className="text-gray-600">Total Orders</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md text-center">
                <h2 className="text-xl font-bold text-purple-600">₹2,50,000</h2>
                <p className="text-gray-600">Total Revenue</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md text-center">
                <h2 className="text-xl font-bold text-orange-600">35</h2>
                <p className="text-gray-600">Total Users</p>
              </div>
            </div>
          </>
        )}



        {/* Users */}
{activeTab === "users" && (
  <>
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <select value={filter} onChange={(e)=>setFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
        <option value="all">All</option>
        <option value="verified">Verified</option>
        <option value="unverified">UnVerified</option>
      </select>
    </div>
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full table-auto">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {artist.length > 0 ? (
            artist.map((a) => (
              <tr key={a._id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3">{a.name}</td>
                <td className="px-4 py-3">{a.email}</td>
                <td className="px-4 py-3">{a.BusinessRole}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      a.isverified
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {a.isverified ? "Verified" : "Unverified"}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  {a.isverified ? (
                    <button onClick={()=>{handleReject(a._id)}} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow">
                      Reject
                    </button>
                  ) : (
                    <>
                      <button onClick={()=>{handleVerify(a._id)}} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow">
                        Verify
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center py-6 text-gray-500"
              >
                🚫 No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    
    {/* Pagination */}
    <div className="flex justify-center items-center gap-4 mt-6">
        <button disabled={page===1} onClick={()=>setPage((p)=>p-1)} className={`px-4 py-2 rounded-lg shadow ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}>Previous</button>
        <span className="text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>
        <button disabled={page===totalPages} onClick={()=>setPage((p)=>page+1)} className={`px-4 py-2 rounded-lg shadow ${page===totalPages ? "bg-gray-300 cursor-not-allowed" :"bg-blue-500 text-white hover:bg-blue-600"}`}>Next</button>
    </div>
  </>
)}


        {/* Products */}
        {activeTab === "products" && (
  <>
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Manage Products</h1>
      <select value={productfilter} onChange={(e)=>setProductFilter(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
        <option value="all">All</option>
        <option value="approved">Approved</option>
        <option value="pending">Pending</option>
      </select>
    </div>

    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full table-auto">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Stock</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        {products.length > 0 ? (
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">
                  <img
                    src={product.image ? `http://localhost:5000/${product.image}`:null }
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">₹{product.price}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.isapproved
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {product.isapproved ? "Approved" : "Pending"}
                  </span>
                </td>
                <td className="px-4 py-8 flex gap-2">
                  { product.isapproved ? 
                  (<button onClick={()=>{handleRejectProduct(product._id)}} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg">
                     Reject
                  </button>):(
                    <>
                      <button onClick={()=>{handleApprove(product._id)}} className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg">
                        Approve
                      </button>
                  </>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td
                colSpan="6"
                className="text-center py-6 text-gray-500"
              >
                🚫 No Products found
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
    {/*pagination*/}
    <div className="flex justify-center items-center gap-4 mt-6">
      <button disabled={productPage===1} onClick={()=>setProductPage((p)=>p-1)} className={`px-4 py-2 rounded-lg shadow ${productPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}>Previous</button>
      <span>{productPage} of {totalProductPages}</span>
      <button disabled={productPage===totalProductPages} onClick={()=>setProductPage((p)=>p+1)} className={`px-4 py-2 rounded-lg shadow ${productPage === totalProductPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}>Next</button>
    </div>
    
  </>
)}

        {/* Orders */}
        {activeTab === "orders" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="w-full table-auto">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Customer</th>
                    <th className="px-4 py-3 text-left">Total</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3">{order.customer}</td>
                      <td className="px-4 py-3">{order.total}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;