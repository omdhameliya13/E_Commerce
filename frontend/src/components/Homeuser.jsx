import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Homeuser = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 3
    };


  return (
    <div>
      <header>
        <div class="header-container flex justify-evenly bg-slate-800 text-white">
            <div class="shrink order-1">FREE DELIVERY ON ORDERS OVER Rs.2999</div>
            <div class="order-2 flex p-2 ">
              <div className="flex gap-4 justify-center -mt-1 w-40 max-w-sm mx-auto">
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
                <Link to="#">
                  <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition hidden">
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
      <div className='justify-center items-center justify-evenly p-14'>
        <Slider {...settings}>
          <div className="px-10">
          <div className='border-2 border-solid border-black rounded-md p-40 hover:scale-105 transition-transform duration-300 ease-in-out'></div>
          </div>
          <div className="px-10">
          <div className='border-2 border-solid border-black rounded-md p-40'></div>
          </div>
          <div className="px-10">
          <div className='border-2 border-solid border-black rounded-md p-40'></div>
          </div>
          <div className="px-10">
          <div className='border-2 border-solid border-black rounded-md p-40'></div>
          </div>
          <div className="px-10">
          <div className='border-2 border-solid border-black rounded-md p-40'></div>
          </div>
          <div className="px-10">
          <div className='border-2 border-solid border-black rounded-md p-40'></div>
          </div>
          
          </Slider>
      </div>
    </div>
  );
};
export default Homeuser; 