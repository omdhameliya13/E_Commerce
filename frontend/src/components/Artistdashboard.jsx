import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Package, PlusCircle, LogOut } from "lucide-react";

const Artistdashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  const products = [
    {
      id: 1,
      name: "Nike Air Zoom",
      description: "High-performance running shoes with superior cushioning.",
      category: "Running Shoes",
      price: 2500,
      qty: 10,
      img: "/photos/nike.jpg",
      status: "Verified",
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      description: "Premium comfort and energy return for everyday runs.",
      category: "Sports Shoes",
      price: 3000,
      qty: 8,
      img: "https://via.placeholder.com/200x150.png?text=Adidas+Ultraboost",
      status: "Pending",
    },
    {
      id: 3,
      name: "Puma Future Rider",
      description: "Casual sneakers with a retro-modern design aesthetic.",
      category: "Casual Shoes",
      price: 2200,
      qty: 12,
      img: "https://via.placeholder.com/200x150.png?text=Puma+Future+Rider",
      status: "Verified",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Dashboard
        </h1>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-3">
          <Link
            to="/allorders"
            className={`p-3 rounded-lg hover:bg-blue-100 transition ${
              activeTab === "products" ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("products")}
          >
            <Package size={20} /> Your Products
          </Link>

          <Link
            to="/pendingorders"
            className="text-gray-600 hover:text-blue-600 transition text-sm"
          >
            Pending Orders
          </Link>

          <Link
            to="/completeorders"
            className="text-gray-600 hover:text-blue-600 transition text-sm"
          >
            Complete Orders
          </Link>

          <Link
            to="/artist"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition mt-4"
          >
            <PlusCircle size={20} /> Add Product
          </Link>

          <Link
            to="/login-user"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-red-600 mt-auto"
          >
            <LogOut size={20} /> Logout
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-3">{product.name}</h2>

              <p className="text-gray-500 text-sm mt-1">{product.description}</p>
              <p className="text-blue-600 text-sm font-medium mt-1">
                Category: {product.category}
              </p>
              <p className="text-gray-600 mt-2">Price: ₹{product.price}</p>
              <p className="text-gray-600">Qty: {product.qty}</p>

              <div className="mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    product.status === "Verified"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {product.status}
                </span>
              </div>

              <div className="flex gap-3 mt-4">
                <Link to={`/artist/update-product/${product.id}`}>
                  <button className="flex-1 px-14 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    Update
                  </button>
                </Link>
                <button className="flex-1 px-14 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
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
