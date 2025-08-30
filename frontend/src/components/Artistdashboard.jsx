import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Package, PlusCircle, LogOut, ArrowLeft } from "lucide-react";

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

  const allOrders = [
    { code: "SHOE-001", company: "Nike", qty: 2, price: 2500, total: 5000, status: "Pending" },
    { code: "SHOE-002", company: "Adidas", qty: 1, price: 3000, total: 3000, status: "Complete" },
    { code: "SHOE-003", company: "Puma", qty: 3, price: 2000, total: 6000, status: "Pending" },
  ];

  const pendingOrders = allOrders.filter((order) => order.status === "Pending");
  const completeOrders = allOrders.filter((order) => order.status === "Complete");

  const renderAllOrdersTable = () => (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full table-auto">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Product Code</th>
            <th className="px-4 py-3 text-left">Company</th>
            <th className="px-4 py-3 text-left">Qty</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Total</th>
            <th className="px-4 py-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition">
              <td className="px-4 py-3">{order.code}</td>
              <td className="px-4 py-3">{order.company}</td>
              <td className="px-4 py-3">{order.qty}</td>
              <td className="px-4 py-3">₹{order.price}</td>
              <td className="px-4 py-3">₹{order.total}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Complete"
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
  );

  const renderPendingOrdersTable = () => (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full table-auto">
        <thead className="bg-yellow-500 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Product Code</th>
            <th className="px-4 py-3 text-left">Company</th>
            <th className="px-4 py-3 text-left">Qty</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Total</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingOrders.map((order, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition">
              <td className="px-4 py-3">{order.code}</td>
              <td className="px-4 py-3">{order.company}</td>
              <td className="px-4 py-3">{order.qty}</td>
              <td className="px-4 py-3">₹{order.price}</td>
              <td className="px-4 py-3">₹{order.total}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600">
                    Mark Complete
                  </button>
                  <button className="px-3 py-1 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600">
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCompleteOrdersTable = () => (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full table-auto">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Product Code</th>
            <th className="px-4 py-3 text-left">Company</th>
            <th className="px-4 py-3 text-left">Qty</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {completeOrders.map((order, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition">
              <td className="px-4 py-3">{order.code}</td>
              <td className="px-4 py-3">{order.company}</td>
              <td className="px-4 py-3">{order.qty}</td>
              <td className="px-4 py-3">₹{order.price}</td>
              <td className="px-4 py-3">₹{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Dashboard
        </h1>

        {/* Sales Orders */}
        <div>
          <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-100 transition">
            <span className="flex items-center gap-3">
              <Package size={20} />
              <span className="font-medium">Sales Orders</span>
            </span>
            <ChevronDown size={20} />
          </button>

          {/* Submenu */}
          <div className="ml-8 mt-2 flex flex-col gap-2">
            <Link to="/allorders" className="text-gray-600 hover:text-blue-600 transition text-sm text-left">
              All Orders
            </Link>
            <button
              onClick={() => setActiveTab("pendingOrders")}
              className="text-gray-600 hover:text-blue-600 transition text-sm text-left"
            >
              Pending Orders
            </button>
            <button
              onClick={() => setActiveTab("completeOrders")}
              className="text-gray-600 hover:text-blue-600 transition text-sm text-left"
            >
              Complete Orders
            </button>
          </div>
        </div>

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
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 relative">
        {/* Logout / Back Button */}
        <div className="absolute top-6 right-8">
          {activeTab === "pendingOrders" || activeTab === "completeOrders" ? (
            <button
              onClick={() => setActiveTab("products")}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          ) : (
            <Link to="/login-user">
              <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition">
                <LogOut size={18} />
                Logout
              </button>
            </Link>
          )}
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {activeTab === "products"
            ? "Your Products"
            : activeTab === "allOrders"
            ? "All Orders"
            : activeTab === "pendingOrders"
            ? "Pending Orders"
            : "Complete Orders"}
        </h1>

        {/* Conditional Rendering */}
        {activeTab === "products" && (
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

                {/* Description */}
                <p className="text-gray-500 text-sm mt-1">{product.description}</p>

                {/* Category */}
                <p className="text-blue-600 text-sm font-medium mt-1">
                  Category: {product.category}
                </p>

                <p className="text-gray-600 mt-2">Price: ₹{product.price}</p>
                <p className="text-gray-600">Qty: {product.qty}</p>

                {/* Status */}
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

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <Link to="/artist">
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
        )}

        {activeTab === "allOrders" && renderAllOrdersTable()}
        {activeTab === "pendingOrders" && renderPendingOrdersTable()}
        {activeTab === "completeOrders" && renderCompleteOrdersTable()}
      </div>
    </div>
  );
};

export default Artistdashboard;
