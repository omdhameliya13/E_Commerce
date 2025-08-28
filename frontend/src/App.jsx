import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import Homeuser from './components/Homeuser';
import { Toaster } from 'react-hot-toast';
import Userregisterpage from './components/Userregisterpage';
import Artistregisterpage from './components/Artistregisterpage';
import Userloginpage from './components/Userloginpage';
import Artistloginpage from './components/Artistloginpage';
import Artist from './components/Aritst';

function App() {
  return (
    /*<Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>*/
    <Router>
      <Routes>
        <Route path="/" element={<Artist/>} />
      </Routes>
    </Router>
  );
}

export default App;