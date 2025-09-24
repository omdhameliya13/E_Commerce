import React from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const cartItems = [
    {
      id: 1,
      name: "Modern Chair",
      price: 2999,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Wooden Table",
      price: 4999,
      quantity: 2,
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white shadow rounded-lg p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md border"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">₹{item.price}</p>
                <div className="flex items-center mt-2">
                  <button className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300">
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300">
                    +
                  </button>
                </div>
              </div>
              <div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
                <button className="text-red-500 text-sm hover:underline mt-2 block">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹12,997</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>₹199</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total</span>
            <span>₹13,196</span>
          </div>
          <Link to="/order">
          <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow transition">
            Proceed to Checkout
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
