import React from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Order() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

        {/* Shipping Information */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
            />
            <input
              type="text"
              placeholder="Street Address"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
            />
            <input
              type="text"
              placeholder="City"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2">
              <option>Choose Country</option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
            </select>
          </form>
        </div>

        {/* Payment Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="radio" name="payment" className="h-4 w-4" />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="radio" name="payment" className="h-4 w-4" />
              <span>Credit/Debit Card</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="radio" name="payment" className="h-4 w-4" />
              <span>UPI / Net Banking</span>
            </label>
          </div>
        </div>

        {/* Total Price Section */}
        <div className="mb-6 border-t pt-4">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <div className="flex justify-between text-lg font-medium">
            <span>Total:</span>
            <span className="text-green-600">₹ 4,599</span>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="text-center">
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg shadow transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
