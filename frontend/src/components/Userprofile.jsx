import axios from "axios";
import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UserProfile() {
  const navigate = useNavigate();

  // Example logged-in user data
  const [user, setUser] = useState({
    name: "John Doe",
    role: "artist", 
    avatar: "https://via.placeholder.com/150", // placeholder avatar
  });

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login-user");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      {isLoggedIn && user ? (
        <div className="bg-slate-900 shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
          {/* Avatar */}
          <div className="flex justify-center">
            <img
              className="w-28 h-28 rounded-full object-cover border-4 border-white"
              src={user.avatar}
            />
          </div>

          {/* Name + Role */}
          <h2 className="mt-4 text-2xl font-semibold text-white">
            {user.name}
          </h2>
          <p
  className={`mt-1 font-medium ${
    user.role === "admin"
      ? "text-blue-600"
      : user.role === "artist"
      ? "text-purple-600"
      : "text-green-600"
  }`}
>
  {user.role === "admin"
    ? "Admin"
    : user.role === "artist"
    ? "Artist"
    : "User"}
</p>
          {/* Logout Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleLogout}
              className="w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl shadow-md transition"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        // If not logged in → show Login button
        <button
          onClick={() => {
            setIsLoggedIn(true);
            setUser({
              name: "Jane Admin",
              role: "admin",
              avatar: "https://via.placeholder.com/150",
            });
            navigate("/");
          }}
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl shadow-md transition"
        >
          Login
        </button>
      )}
    </div>
  );
}
