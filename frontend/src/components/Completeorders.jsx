import React from "react";
import { useNavigate } from "react-router-dom";

const completeOrders = [
  { code: "SHOE-002", company: "Adidas", qty: 1, price: 3000, total: 3000, status: "Complete" },
];

const Completeorders = () => {
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

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Complete Orders</h1>
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
    </div>
  );
};

export default Completeorders;
