import React from "react";
import { Link } from "react-router-dom";

const Artist = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Bar with Dashboard Button */}
      <div className="flex justify-end mb-6">
        <Link
          to="/artistdashboard"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-lg shadow-md transition duration-300"
        >
          Dashboard
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center space-y-8">
        {/* Add Product Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Add New Product
          </h2>

          <form className="space-y-5">
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 font-medium">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium">
                Description
              </label>
              <textarea
                placeholder="Enter product description"
                rows="3"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium">Category</label>
              <select
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Puma">Puma</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 font-medium">Price (₹)</label>
              <input
                type="number"
                placeholder="Enter price"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-gray-700 font-medium">Stock</label>
              <input
                type="number"
                placeholder="Enter available stock"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Product Image */}
            <div>
              <label className="block text-gray-700 font-medium">
                Product Image
              </label>
              <input
                type="file"
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Product List Table */}
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-6xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Added Products
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Stock</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2">
                    <img
                      src="https://via.placeholder.com/80"
                      alt="Product"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">Air Max</td>
                  <td className="px-4 py-2">Nike</td>
                  <td className="px-4 py-2">₹3,499</td>
                  <td className="px-4 py-2">20</td>
                  <td className="px-4 py-2 flex gap-3 justify-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow-md transition">
                      Upgrade
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-md transition">
                      Delete
                    </button>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-2">
                    <img
                      src="https://via.placeholder.com/80"
                      alt="Product"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">Ultraboost</td>
                  <td className="px-4 py-2">Adidas</td>
                  <td className="px-4 py-2">₹5,999</td>
                  <td className="px-4 py-2">15</td>
                  <td className="px-4 py-2 flex gap-3 justify-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow-md transition">
                      Upgrade
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-md transition">
                      Delete
                    </button>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">
                    <img
                      src="https://via.placeholder.com/80"
                      alt="Product"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">RS-X</td>
                  <td className="px-4 py-2">Puma</td>
                  <td className="px-4 py-2">₹4,299</td>
                  <td className="px-4 py-2">10</td>
                  <td className="px-4 py-2 flex gap-3 justify-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg shadow-md transition">
                      Upgrade
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-md transition">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;
