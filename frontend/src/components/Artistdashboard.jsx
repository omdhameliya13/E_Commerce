import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Package, PlusCircle, LogOut } from "lucide-react";
import axios from "axios";

const Artistdashboard = () => {
  const [products, setProduct] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!token) {
          window.alert("No token, Please Login again");
          return;
        }

        const res = await axios.get(
          "http://localhost:5000/api/v1/artist/product/getProduct",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", res.data);
        setProduct(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error.response?.data?.error || error.message);
        window.alert("Failed to load Product");
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
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Remove deleted product from UI without refreshing
    setProduct((prev) => prev.filter((p) => p._id !== id));

    window.alert("Product deleted successfully");
  } catch (error) {
    console.error(error.response?.data?.error || error.message);
    window.alert("Failed to delete product");
  }
};


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Dashboard
        </h1>

        <div>
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

          <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-100 transition">
            <span className="flex items-center gap-3">
              <Package size={20} />
              <span className="font-medium">Sales Orders</span>
            </span>
            <ChevronDown size={20} />
          </button>

          <div className="ml-8 mt-2 flex flex-col gap-2">
              <Link
                to="/allorders"
                className="text-gray-600 hover:text-blue-600 transition text-sm text-left"
              >
              All Orders
            </Link>
            <Link
                to="#"
                className="text-gray-600 hover:text-blue-600 transition text-sm text-left"
              >
              Pending Orders
            </Link>
            <Link
                to="#"
                className="text-gray-600 hover:text-blue-600 transition text-sm text-left"
              >
              Completed Orders
            </Link>
          </div>
        </div>

        
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 relative">
        {/* Logout Button */}
        <div className="absolute top-6 right-8">
          <Link to="/login-user">
            <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition">
              <LogOut size={18} />
              Logout
            </button>
          </Link>
        </div>

        {/* Product Grid */}
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

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <Link to={`/artistupdate/${p._id}`}>
                  <button className="flex-1 px-14 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    Update
                  </button>
                </Link>
                <button onClick={()=>handleDelete(p._id)} className="flex-1 px-14 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artistdashboard;
