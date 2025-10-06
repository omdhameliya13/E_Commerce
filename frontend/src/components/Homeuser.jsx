import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Homeuser = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
  };

  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/user/product/getProduct`
        );
        setProduct(res.data.products);
      } catch (error) {
        console.log(error.res?.data?.error);
        toast.error("Failed to fetch products");
      }
    };
    fetchProduct();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      if(!token){
        toast.error("Login First");
        navigate("/login-user");
        return;
      }
      
      await axios.post(
        "http://localhost:5000/api/v1/user/cart/addToCart",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to Cart");
      navigate("/cart");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Login First");
        localStorage.removeItem("token"); // optional: clear invalid token
        navigate("/login-user");
      }
      else{
        console.log(error.res?.data?.error);
        toast.error(error.res?.data?.error);
      }
      
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <img src="/photos/logo.png" alt="Logo" className="h-16 w-auto" />
          <input
            type="text"
            placeholder="Search products..."
            className="px-3 py-1.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm w-64"
          />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          {/* Profile */}
          <Link to="/user-profile">
            <ion-icon
              name="person-circle"
              class="text-3xl text-gray-700 hover:text-blue-500 transition"
            ></ion-icon>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ion-icon
              name="cart"
              class="text-2xl text-gray-700 hover:text-blue-500 transition"
            ></ion-icon>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              0
            </span>
          </Link>

          {/* Your Orders */}
          <Link to="/orders">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition">
              Your Orders
            </button>
          </Link>
        </div>
      </div>

      {/* Banner */}
      <div className="relative w-full h-64 mb-12">
        <img
          src="/photos/banner.jpg"
          className="w-full h-full object-cover rounded-lg"
          alt="banner"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome to Our Store</h1>
          <p className="text-sm">Discover the best products for your home</p>
        </div>
      </div>

      {/* Top Trends */}
      <div className="px-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b-2 border-blue-500 pb-2">
          Top Trends
        </h2>
      </div>

      {/* Product Slider */}
      <div className="px-6 mb-16">
        <Slider {...settings}>
          {product.map((p) => (
            <div key={p._id} className="px-3">
              <div className="bg-white rounded-lg p-4 flex flex-col items-center hover:shadow-lg transform hover:scale-105 transition">
                <img
                  src={p.image ? `http://localhost:5000/${p.image}` : null}
                  alt={p.name}
                  className="w-36 h-36 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
                <p className="text-blue-600 font-bold mb-1">₹{p.price}</p>
                <p className="text-gray-500 text-sm text-center mb-3">
                  {p.description}
                </p>
                {p.stock <= 0 && (
                    <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-semibold">
                      Out of Stock
                    </span>
                )}
                <button
                  onClick={() => handleAddToCart(p._id)}
                  disabled={p.stock <= 0}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-full text-sm transition"
                >
                  {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-white mb-4">About Us</h4>
            <p className="text-sm">
              We provide the best home decor and apparel with fast delivery and
              top-notch customer service.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500">Home</a></li>
              <li><a href="#" className="hover:text-blue-500">Products</a></li>
              <li><a href="#" className="hover:text-blue-500">Contact</a></li>
              <li><a href="#" className="hover:text-blue-500">Help</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-500">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-500">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-blue-500">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Contact Us</h4>
            <p className="text-sm mb-2">Email: support@example.com</p>
            <p className="text-sm mb-2">Phone: +91 12345 67890</p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-blue-500">Facebook</a>
              <a href="#" className="hover:text-blue-500">Instagram</a>
              <a href="#" className="hover:text-blue-500">Twitter</a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-6 text-sm">
          &copy; 2025 All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default Homeuser;
