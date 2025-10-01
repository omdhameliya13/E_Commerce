import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Package, PlusCircle, LogOut, User } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Artistdashboard = () => {
  const token = localStorage.getItem("token");
  const [artist, setArtist] = useState(null);
  const [products, setProduct] = useState([]);
  const [activeTab, setActiveTab] = useState("products"); 

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/artist/profile/getProfile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setArtist(res.data);
      } catch (error) {
        console.log(error.res?.data?.error);
      }
    };
    fetchArtist();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!token) {
          toast.error("No token, Please Login again");
          return;
        }
        const res = await axios.get(
          "http://localhost:5000/api/v1/artist/product/getProduct",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setProduct(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error.response?.data?.error || error.message);
        toast.error("Failed to load Product");
        setProduct([]);
      }
    };
    fetchProduct();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/artist/product/deleteProduct/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProduct((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error.response?.data?.error || error.message);
      toast.error("Failed to delete product");
    }
  };

  // Dummy orders for UI only
  const orders = [
    {
      id: 1,
      customer: "John Doe",
      productImg: "https://via.placeholder.com/60",
      productName: "Handmade Vase",
      qty: 2,
      price: 500,
      total: 1000,
      address: "123 Main Street",
      phone: "9876543210",
      email: "john@example.com",
      city: "Mumbai",
      pincode: "400001",
      state: "Maharashtra",
      paymentMethod: "Online",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Alice Smith",
      productImg: "https://via.placeholder.com/60",
      productName: "Painting",
      qty: 1,
      price: 2000,
      total: 2000,
      address: "456 Park Avenue",
      phone: "9123456780",
      email: "alice@example.com",
      city: "Delhi",
      pincode: "110001",
      state: "Delhi",
      paymentMethod: "Cash on Delivery",
      status: "Completed",
    },
  ];
  const [order,setOrder] = useState([]);
  useEffect(()=>{
    const fetchOrder = async()=>{
      try {
        const res = await axios.get("http://localhost:5000/api/v1/artist/orders/getOrders",{
          headers:{Authorization:`Bearer ${token}`}
        })
        console.log(res.data);
        setOrder(res.data);
      } catch (error) {
        console.log(error.res?.data?.error);
        toast.error("Error to Fetch Orders");
      }
    }
    fetchOrder();
  },[token,activeTab]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Dashboard
        </h1>

        {/* Add Product */}
        <div className="mt-4">
          <Link
            to="/artist"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition"
          >
            <PlusCircle size={20} />
            <span className="font-medium">Add Product</span>
          </Link>
        </div>

        {/* Sales Orders */}
        <button
          className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-100 transition"
          onClick={() => setActiveTab("orders")}
        >
          <span className="flex items-center gap-3">
            <Package size={20} />
            <span className="font-medium">Sales Orders</span>
          </span>
          <ChevronDown size={20} />
        </button>

       

        {/* Profile */}
        <div className="mt-4">
          <Link
            to="/artist-profile"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition"
          >
            <User size={20} />
            <span className="font-medium">Profile</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Top bar with Logout */}
        <div className="flex justify-end mb-6">
          <Link to="/login-user">
            <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition">
              <LogOut size={18} />
              Logout
            </button>
          </Link>
        </div>

        {/* Conditional Rendering */}
        {activeTab === "products" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition"
              >
                <img
                  src={p.image ? `http://localhost:5000/${p.image}` : null}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="text-lg font-semibold mt-3">{p.name}</h2>
                <p className="text-gray-500 text-sm mt-1">{p.description}</p>
                <p className="text-blue-600 text-sm font-medium mt-1">
                  Category: {p.category}
                </p>
                <p className="text-gray-600 mt-2">Price: ₹{p.price}</p>
                <p className="text-gray-600">Qty: {p.stock}</p>
                <div className="mt-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      p.isapproved
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {p.isapproved ? "Approved" : "Pending"}
                  </span>
                </div>
                <div className="flex gap-3 mt-4">
                  <Link to={`/artistupdate/${p._id}`}>
                    <button className="flex-1 px-14 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 px-14 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "orders" && (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Qty</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Price</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Address</th>
                  <th className="px-4 py-3 text-sm font-semibold">Contact</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">City</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Pincode</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">State</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Payment</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {order.map((od) => (
                  od.products.map((product, index) => (
                    <tr key={product._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{od.fullname}</td>

                      <td className="px-4 py-3 flex items-center gap-3">
                        <img
                          src={product.productId.image?`http://localhost:5000/${product.productId.image}`:null}
                          alt={product.productId.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <span>{product.productId.name}</span>
                      </td>

                      <td className="px-4 py-3 text-center">{product.quantity}</td>

                      <td className="px-4 py-3 text-center">₹{product.productId.price}</td>

                      <td className="px-4 py-3 text-center font-semibold">
                        ₹{od.totalAmount}
                      </td>

                      <td className="px-4 py-3">{od.address}</td>

                      <td className="px-4 py-3 text-sm">
                        <p>{od.mobileno}</p>
                        <p className="text-gray-500">{od.email}</p>
                      </td>

                      <td className="px-4 py-3 text-center">{od.city}</td>
                      <td className="px-4 py-3 text-center">{od.pincode}</td>
                      <td className="px-4 py-3 text-center">{od.state}</td>
                      <td className="px-4 py-3 text-center">{od.paymentMethod}</td>

                      <td className="px-4 py-3 text-center">
                        {od.status === "Completed" ? (
                          <button className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                            Completed
                          </button>
                        ) : (
                          <button className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-medium">
                            Pending
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Artistdashboard;
