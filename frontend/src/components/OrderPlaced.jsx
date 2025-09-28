import React from "react";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-4xl font-extrabold mb-6 text-green-700">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-700 mb-8">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderPlaced;