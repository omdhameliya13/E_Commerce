import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Package, PlusCircle, Search, LogOut } from "lucide-react";

const Artistdashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Dashboard
        </h1>

        {/* Sales Orders */}
        <div>
          <button className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-100 transition">
            <span className="flex items-center gap-3">
              <Package size={20} />
              <span className="font-medium">Sales Orders</span>
            </span>
            <ChevronDown size={20} />
          </button>

          {/* Submenu */}
          <div className="ml-8 mt-2 flex flex-col gap-2">
            <Link
              to="#"
              className="text-gray-600 hover:text-blue-600 transition text-sm"
            >
              Pending
            </Link>
            <Link
              to="#"
              className="text-gray-600 hover:text-blue-600 transition text-sm"
            >
              Complete
            </Link>
          </div>
        </div>

        {/* Add Product */}
        <div className="mt-4">
          <Link
            to="/artist"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition"
          >
            <PlusCircle size={20} />
            <span className="font-medium">Add Product</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 relative">
        {/* Logout Button */}
        <div className="absolute top-6 right-8">
            <Link to="/login-user">
          <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition">
            <LogOut size={18} />
            Logout
          </button>
          </Link>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Hey Seller 👋</h1>

        {/* Search Bar */}
        <div className="relative w-full max-w-md mb-6">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Product Code</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Qty</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3">SHOE-001</td>
                <td className="px-4 py-3">Nike</td>
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">₹2500</td>
                <td className="px-4 py-3">₹5000</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600">
                      Complete
                    </button>
                    <button className="px-3 py-1 rounded-lg text-sm font-medium bg-yellow-500 text-white hover:bg-yellow-600">
                      Pending
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3">SHOE-002</td>
                <td className="px-4 py-3">Adidas</td>
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">₹3000</td>
                <td className="px-4 py-3">₹3000</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600">
                      Complete
                    </button>
                    <button className="px-3 py-1 rounded-lg text-sm font-medium bg-yellow-500 text-white hover:bg-yellow-600">
                      Pending
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3">SHOE-003</td>
                <td className="px-4 py-3">Puma</td>
                <td className="px-4 py-3">3</td>
                <td className="px-4 py-3">₹2000</td>
                <td className="px-4 py-3">₹6000</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600">
                      Complete
                    </button>
                    <button className="px-3 py-1 rounded-lg text-sm font-medium bg-yellow-500 text-white hover:bg-yellow-600">
                      Pending
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Artistdashboard;
