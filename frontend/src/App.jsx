import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homeuser from './components/Homeuser';
import { Toaster } from 'react-hot-toast';
import Userregisterpage from './components/Userregisterpage';
import Artistregisterpage from './components/Artistregisterpage';
import Userloginpage from './components/Userloginpage';
import Artistloginpage from './components/Artistloginpage';
import Artist from './components/Aritst';

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Homeuser />} />

        {/* User Pages */}
        <Route path="/register-user" element={<Userregisterpage />} />
        <Route path="/login-user" element={<Userloginpage />} />

        {/* Artist Pages */}
        <Route path="/register-artist" element={<Artistregisterpage />} />
        <Route path="/login-artist" element={<Artistloginpage />} />
        <Route path="/artist" element={<Artist />} />
      </Routes>
    </Router>
  );
}

export default App;