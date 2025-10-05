import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Order() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullname: "",
    mobileno: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    payment: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login-user");
      toast.error("Please Login First");
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/order/createOrder",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Order Placed Successfully");
      console.log(res.data);
      navigate('/orderPlace');
    } catch (error) {
      console.log(error.response?.data?.error);
      toast.error("Failed to Place Order");
    }
  };

   const [subTotal, setSubTotal] = useState(0);
  const token = localStorage.getItem("token");

  //  Fetch cart subtotal on page load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/user/cart/getCart",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSubTotal(res.data.subTotal);
      } catch (error) {
        console.log(error.response?.data);
        toast.error("Failed to fetch cart");
      }
    };
    fetchCart();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 p-6 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Shipping Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
              Shipping Information
            </h2>

            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="mobileno"
              placeholder="Phone Number"
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Postal Code"
                onChange={handleChange}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <select
              name="state"
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Choose State</option>
              <option value="Gujrat">Gujrat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Rajasthan">Rajasthan</option>
            </select>
          </div>

          {/* Payment Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                Payment Method
              </h2>
              <div className="space-y-4 mt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.payment === "cod"}
                    onChange={handleChange}
                    className="h-5 w-5 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700">Cash on Delivery</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={formData.payment === "upi"}
                    onChange={handleChange}
                    className="h-5 w-5 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700">UPI / Net Banking</span>
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Order Summary
              </h2>
              <div className="flex justify-between text-lg font-medium">
                <span>Total:</span>
                <span className="text-green-600 font-bold">{subTotal}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="pt-4">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg shadow-lg transition transform hover:scale-105">
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
