import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Package, PlusCircle, Search, LogOut } from "lucide-react";

const Artistdashboard = () => {
  // Sample orders data
  const orders = [
    { code: "SHOE-001", company: "Nike", qty: 2, price: 2500, total: 5000, status: "Complete" },
    { code: "SHOE-002", company: "Adidas", qty: 1, price: 3000, total: 3000, status: "Pending" },
    { code: "SHOE-003", company: "Puma", qty: 3, price: 2000, total: 6000, status: "Pending" },
    { code: "SHOE-004", company: "Reebok", qty: 1, price: 3500, total: 3500, status: "Complete" },
  ];

  const [selectedFilter, setSelectedFilter] = useState("All");
  const filteredOrders =
    selectedFilter === "All"
      ? orders
      : orders.filter((order) => order.status === selectedFilter);

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
            <button
              onClick={() => setSelectedFilter("Pending")}
              className={`text-left text-sm transition ${
                selectedFilter === "Pending"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setSelectedFilter("Complete")}
              className={`text-left text-sm transition ${
                selectedFilter === "Complete"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Complete
            </button>
            <button
              onClick={() => setSelectedFilter("All")}
              className={`text-left text-sm transition ${
                selectedFilter === "All"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              All Orders
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
        {/* Logout Button */}
        <div className="absolute top-6 right-8">
          <Link to="/login-user">
            <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition">
              <LogOut size={18} />
              Logout
            </button>
          </Link>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Hey Seller 👋
        </h1>

        {/* Search Bar */}
        <div className="relative w-full max-w-md mb-6">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Product Code</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Qty</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Total</th>
                {selectedFilter !== "Complete" && (
                  <th className="px-4 py-3 text-left">Status</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{order.code}</td>
                  <td className="px-4 py-3">{order.company}</td>
                  <td className="px-4 py-3">{order.qty}</td>
                  <td className="px-4 py-3">₹{order.price}</td>
                  <td className="px-4 py-3">₹{order.total}</td>
                  {selectedFilter !== "Complete" && (
                    <td className="px-4 py-3">
                      {selectedFilter === "Pending" ? (
                        <div className="flex gap-2">
                          <button className="px-3 py-1 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-red-600">
                            Action
                          </button>
                          <button className="px-3 py-1 rounded-lg text-sm font-medium bg-yellow-500 text-white hover:bg-yellow-600">
                            Pending
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            order.status === "Complete"
                              ? "bg-green-500 text-white"
                              : "bg-yellow-500 text-white"
                          }`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={selectedFilter === "Complete" ? 5 : 6}
                    className="text-center py-6 text-gray-500"
                  >
                    No orders found 😕
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Artistdashboard;
