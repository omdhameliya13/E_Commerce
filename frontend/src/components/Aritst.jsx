import React from 'react';

const Artist = () => {
    return(
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                        Add New Product
                    </h2>

        <form className="space-y-5">
          
            <div>
                <label className="block text-gray-700 font-medium">Product Name</label>
                    <input type="text" placeholder="Enter product name" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required/>
            </div>

            <div>
                <label className="block text-gray-700 font-medium">Description</label>
                    <textarea placeholder="Enter product description" rows="3" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
            </div>

            <div>
                <label className="block text-gray-700 font-medium">Category</label>
                    <select className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
                        <option value="">Select Category</option>
                    </select>
            </div>

            <div>
                <label className="block text-gray-700 font-medium">Price (₹)</label>
                    <input type="number" placeholder="Enter price" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required/>
            </div>

            <div>
                <label className="block text-gray-700 font-medium">Stock</label>
                    <input type="number" placeholder="Enter available stock" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required/>
            </div>

            <div>
                <label className="block text-gray-700 font-medium">Product Image</label>
                    <input type="file" className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required/>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300">
                Add Product
            </button>
        </form>
      </div>
    </div>
</div>
);
};


export default Artist;