import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homeuser from './components/Homeuser';
import { Toaster } from 'react-hot-toast';
import Userregisterpage from './components/Userregisterpage';
import Artistregisterpage from './components/Artistregisterpage';
import Userloginpage from './components/Userloginpage';
import Artistloginpage from './components/Artistloginpage';
import Artist from './components/Aritst';
import Artistdashboard from './components/Artistdashboard';
import AllOrders from './components/Allorders';
import Admindashboard from './components/Admindashboard';
import Adminlogin from './components/Adminlogin';
import Adminsignup from './components/Adminsignup';
import Pendingorders from './components/Pendingorders';
import Completeorders from './components/Completeorders'
import ArtistUpdate from './components/ArtistUpdate';
import Userprofile from './components/Userprofile';
import Cart from './components/Cart';
import Order from './components/Order'
import OrderPlaced from './components/OrderPlaced';
import ArtistProfile from './components/ArtistProfile';


function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Homeuser />} />

        {/* User Pages */}
        <Route path="/register-user" element={<Userregisterpage />} />
        <Route path="/login-user" element={<Userloginpage />} />
        <Route path="/user-profile" element={<Userprofile />} />
        <Route path="/artist-profile" element={<ArtistProfile />} />

        {/* Artist Pages */}
        <Route path="/register-artist" element={<Artistregisterpage />} />
        <Route path="/login-artist" element={<Artistloginpage />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/artistupdate/:id" element={<ArtistUpdate />} />
        <Route path="/artistdashboard" element={<Artistdashboard />} />
        <Route path="/allorders" element={<AllOrders />} />

        {/* Admin */}
        <Route path="/admindashboard" element={<Admindashboard/>} />
        <Route path="/adminlogin" element={<Adminlogin/>} />
        <Route path="/adminsignup" element={<Adminsignup/>} />

        {/* Orders */}
        <Route path="/pendingorders" element={<Pendingorders/>} />
        <Route path="/completeorders" element={<Completeorders/>} />
        <Route path="/order" element={<Order/>} />

        
        {/* cart page */}
        <Route path="/cart" element={<Cart/>} />
        <Route path='/orderPlace' element={<OrderPlaced/>}/>

      </Routes>
      <Toaster position='bottom-right' toastOptions={{style:{fontSize:"16px",padding:"16px 20px",borderRedius:"10px"}}} reverseOrder="false"></Toaster>
    </Router>
  );
}

export default App;