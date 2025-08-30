import React, { useState } from "react";
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Dummy Data
  const products = [
    {
      id: 1,
      name: "Nike Air Zoom",
      price: 2500,
      stock: 10,
      img: "https://via.placeholder.com/150x100.png?text=Nike+Air+Zoom",
      status: "Active",
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: 3000,
      stock: 8,
      img: "https://via.placeholder.com/150x100.png?text=Adidas+Ultraboost",
      status: "Inactive",
    },
  ];

  const orders = [
    { id: 1, customer: "John Doe", total: "₹5000", status: "Pending" },
    { id: 2, customer: "Jane Smith", total: "₹3000", status: "Completed" },
    { id: 3, customer: "Mike Ross", total: "₹2000", status: "Pending" },
  ];

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", status: "Verified" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Unverified" },
    { id: 3, name: "Mike Ross", email: "mike@example.com", role: "Customer", status: "Verified" },
  ];

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
            onClick={() => setActiveTab("users")}
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
    <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
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
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.role}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    user.status === "Verified"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-4 py-3 flex gap-2">
                {/* Conditional buttons based on user status */}
                {user.status === "Verified" ? (
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow">
                    Reject
                  </button>
                ) : (
                  <>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow">
                      Approve
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow">
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
)}

        {/* Products */}
        {activeTab === "products" && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Manage Products</h1>
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition">
                <PlusCircle size={18} /> Add Product
              </button>
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
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3">
                        <img
                          src={product.img}
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
                            product.status === "Active"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg">
                          <Edit size={16} /> Edit
                        </button>
                        <button className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg">
                          <Trash2 size={16} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
