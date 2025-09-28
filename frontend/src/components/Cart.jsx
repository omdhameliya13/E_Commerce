import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
export default function Cart() {
  const token = localStorage.getItem("token");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/user/cart/getCart",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Cart Response:", res.data);

        //  Adjust based on API shape
        if (res.data.products) {
          setItems(res.data.products); // if backend returns { products: [...] }
        } else if (res.data.cart?.products) {
          setItems(res.data.cart.products); // if backend returns { cart: { products: [...] } }
        } else if (Array.isArray(res.data)) {
          setItems(res.data);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.log(error.response?.data?.error || error.message);
      }
    };
    fetchCart();
  }, [token]);

  const handleRemove = async (productId) => {
  try {
    await axios.post(
      "http://localhost:5000/api/v1/user/cart/removeFromCart",
      { productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setItems(items.filter((it) => it.productId._id !== productId));
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
};

const handleCart = async (productId, newQty,stock) => {
  if (newQty < 1) return handleRemove(productId);; // no zero qty
   if (newQty > stock) {
      toast.error("Out of stock!");
      return;
    }
  try {
    const res = await axios.put(
      "http://localhost:5000/api/v1/user/cart/updateCart",
      { productId, quantity: newQty },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setItems((prev) =>
        prev.map((it) =>
          it.productId._id === productId ? { ...it, quantity: newQty } : it
        )
      );
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
  }
};
  //  calculate subtotal
  const subtotal = items.reduce(
    (acc, it) => acc + (it.productId?.price || 0) * it.quantity,
    0
  );

  const shipping = subtotal > 0 ? 199 : 0;
  const total = subtotal + shipping;
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {items.length > 0 ? (
            items.map((it) => (
              <div
                key={it._id}
                className="flex items-center bg-white shadow rounded-lg p-4"
              >
                <img
                  src={
                    it.productId?.image
                      ? `http://localhost:5000/${it.productId.image}`
                      : "/placeholder.png"
                  }
                  alt={it.productId?.name || "Product"}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-semibold">
                    {it.productId?.name}
                  </h2>
                  <p className="text-gray-600">₹{it.productId?.price}</p>
                  <div className="flex items-center mt-2">
                    <button onClick={()=>handleCart(it.productId._id,it.quantity - 1,it.productId.stock)} className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300">
                      -
                    </button>
                    <span className="px-4">{it.quantity}</span>
                    <button onClick={()=>handleCart(it.productId._id,it.quantity + 1,it.productId.stock)} className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300">
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <p className="font-semibold">
                    ₹{(it.productId?.price || 0) * it.quantity}
                  </p>
                  <button onClick={()=>handleRemove(it.productId._id)} className="text-red-500 text-sm hover:underline mt-2 block">
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>₹{shipping}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total</span>
            <span>₹{total}</span>
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
