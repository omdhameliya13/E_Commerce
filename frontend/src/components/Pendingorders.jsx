import React from "react";
import { useNavigate } from "react-router-dom";

const pendingOrders = [
  { code: "SHOE-001", company: "Nike", qty: 2, price: 2500, total: 5000, status: "Pending" },
  { code: "SHOE-003", company: "Puma", qty: 3, price: 2000, total: 6000, status: "Pending" },
];

const Pendingorders = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 relative">
      {/* Back Button */}
      <div className="absolute top-6 right-8">
        
        <button
          onClick={() => navigate("/artistdashboard")}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          Back
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Pending Orders</h1>
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
                <td className="px-4 py-3 flex gap-2">
                  <button className="px-3 py-1 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600">
                    Mark Complete
                  </button>
                  <button className="px-3 py-1 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pendingorders;
