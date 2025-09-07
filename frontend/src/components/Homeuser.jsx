import React,{useState,useEffect} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';

const Homeuser = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 3
    };

    const[product,setProduct] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(()=>{
      const fetchProduct = async()=>{
        try {
          const res = await axios.get("http://localhost:5000/api/v1/user/product/getProduct");
          console.log(res.data);
          setProduct(res.data);
        } catch (error) {
          console.log(error.res?.data?.error);
          toast.error("Faild to fetch product");
        }

      }
      fetchProduct();
    },[]);


  return (
    <div>
      <header>
        <div class="header-container flex justify-evenly bg-slate-800 text-white">
            <div class="shrink order-1">FREE DELIVERY ON ORDERS OVER Rs.2999</div>
            <div class="order-2 flex p-2 ">
              <div className="flex gap-4 justify-center -mt-1 w-40 max-w-sm mx-auto">
                {/*
                <Link to="/login-user">
                <button className="flex-1 px-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                    Login
                </button>
                </Link>
                <Link to="/register-user">
                  <button className="flex-1 px-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                    Register
                  </button>
                </Link>
                */}
                <Link to="#">
                  <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition ">
                    My Account
                  </button>
                  </Link>
                </div>
              <div className='flex p-1 px-12'>
                <button>
                <ion-icon name="cart" className='p-1 text-2xl'></ion-icon>
                </button>
            </div>
            </div>
        </div>
      </header>
      <nav className='flex justify-between items-center w-[92%]'>
        <div className=''>
              <img src="/photos/logo.png" alt="logo" class="relative h-40 w-60"/>
        </div>
        <div className='nav-links md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex-iteam-center px-5'>
          <ul className='flex md:flex-row flex-col md:iteam-center md:gap-[4vw] gap-8'>
            <li><a className='hover:text-slate-800' href="#">HOME</a></li>
            <li><a className='hover:text-slate-800' href="#">PRODUCT</a></li>
            <li><a className='hover:text-slate-800' href="#">CONTACT</a></li>
            <li><a className='hover:text-slate-800' href="#">TEAM</a></li>
            <li><a className='hover:text-slate-800' href="#">HELP</a></li>
          </ul>
        </div>

        <div className='flex items-center gap-6'>
          <ion-icon  name="menu" class="text-3x1 cursor-pointer md:hidden"></ion-icon>
        
        <div className='flex items-center gap-6'>
          <div className="hidden md:block">
            <input
                type="text"
                placeholder="Search products..."
                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
        </div>
      </div>
    </nav>
      <div>
        <img src="/photos/banner.jpg" class="w-full h-full object-cover" alt="banner"/>
      </div>

      <div className='p-8'>
  <h1 className='text-2xl text-center font-bold border-4 border-solid border-black p-3'>Top Trends</h1>
</div>

<div className='p-14'>
  <Slider {...settings}>
    {product.map((p) => (
      <div key={p._id} className="px-5">
        <div className='border-2 border-solid border-black rounded-md p-4 flex flex-col items-center'>
          <img src={p.image ? `http://localhost:5000/${p.image}` : null} alt={p.name} className="w-40 h-40 object-cover mb-4 rounded-md"/>
          <h2 className="text-lg font-bold">{p.name}</h2>
          <p className="text-gray-700 font-semibold">{p.price}</p>
          <p className="text-gray-500 text-sm text-center mb-3">{p.description}</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </Slider>
</div>

    <footer className="bg-gray-800 text-white mt-16">
  <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
    {/* About */}
    <div>
      <h2 className="font-bold text-lg mb-4">About Us</h2>
      <p className="text-gray-300 text-sm">
        We provide the best Home decor and apparel with fast delivery and top-notch customer service.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h2 className="font-bold text-lg mb-4">Quick Links</h2>
      <ul className="text-gray-300 text-sm space-y-2">
        <li><a href="#" className="hover:text-blue-400">Home</a></li>
        <li><a href="#" className="hover:text-blue-400">Products</a></li>
        <li><a href="#" className="hover:text-blue-400">Contact</a></li>
        <li><a href="#" className="hover:text-blue-400">Help</a></li>
      </ul>
    </div>

    {/* Customer Service */}
    <div>
      <h2 className="font-bold text-lg mb-4">Customer Service</h2>
      <ul className="text-gray-300 text-sm space-y-2">
        <li><a href="#" className="hover:text-blue-400">FAQ</a></li>
        <li><a href="#" className="hover:text-blue-400">Shipping & Returns</a></li>
        <li><a href="#" className="hover:text-blue-400">Terms & Conditions</a></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h2 className="font-bold text-lg mb-4">Contact Us</h2>
      <p className="text-gray-300 text-sm mb-2">Email: support@example.com</p>
      <p className="text-gray-300 text-sm mb-2">Phone: +91 12345 67890</p>
      <div className="flex gap-3 mt-2">
        <a href="#" className="hover:text-blue-400">Facebook</a>
        <a href="#" className="hover:text-blue-400">Instagram</a>
        <a href="#" className="hover:text-blue-400">Twitter</a>
      </div>
    </div>
  </div>

  <div className="bg-gray-900 text-gray-400 text-center py-4 text-sm">
    &copy; 2025 Your E-commerce Website. All rights reserved.
  </div>
</footer>

    </div>
  );
};
export default Homeuser; 