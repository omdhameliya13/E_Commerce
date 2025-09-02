import React from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

const AllOrders = () => {

  const orders = [
    { code: "SHOE-001", company: "Nike", qty: 2, price: 2500, total: 5000, status: "Complete" },
    { code: "SHOE-002", company: "Adidas", qty: 1, price: 3000, total: 3000, status: "Pending" },
    { code: "SHOE-003", company: "Puma", qty: 3, price: 2000, total: 6000, status: "Complete" },
    { code: "SHOE-004", company: "Reebok", qty: 1, price: 3500, total: 3500, status: "Pending" },
  ];

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
              <th className="px-4 py-3 text-left">Product Code</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Qty</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition"
              >
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
    </div>
  );
};

export default AllOrders;
