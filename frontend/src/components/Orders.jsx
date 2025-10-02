import React from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();

  // Dummy orders for UI
  const orders = [
    {
      _id: "ORD1001",
      product: "Modern Sofa",
      quantity: 1,
      totalPrice: 12000,
      status: "Pending",
      createdAt: "2025-09-28",
    },
    {
      _id: "ORD1002",
      product: "Dining Table",
      quantity: 1,
      totalPrice: 18000,
      status: "Delivered",
      createdAt: "2025-09-20",
    },
    {
      _id: "ORD1003",
      product: "Wall Clock",
      quantity: 2,
      totalPrice: 1500,
      status: "Cancelled",
      createdAt: "2025-09-18",
    },
    {
      _id: "ORD1004",
      product: "Bed Frame",
      quantity: 1,
      totalPrice: 25000,
      status: "Delivered",
      createdAt: "2025-08-30",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Your Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">No orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Total Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">{order._id}</td>
                  <td className="px-6 py-3">{order.product}</td>
                  <td className="px-6 py-3">{order.quantity}</td>
                  <td className="px-6 py-3">₹{order.totalPrice}</td>
                  <td
                    className={`px-6 py-3 font-semibold ${
                      order.status === "Cancelled"
                        ? "text-red-500"
                        : order.status === "Delivered"
                        ? "text-green-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="px-6 py-3">{order.createdAt}</td>
                  <td className="px-6 py-3">
                    {order.status === "Pending" && (
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs">
                        Cancel
                      </button>
                    )}
                    {order.status === "Delivered" && (
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs">
                        Reorder
                      </button>
                    )}
                    {order.status === "Cancelled" && (
                      <span className="text-gray-400 text-xs">No Action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
