import axios from "axios";
import React,{useEffect, useState} from "react";
import { Link,useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Artist = () => {
      const{id} = useParams();
      const navigate = useNavigate();
      const token = localStorage.getItem("token");
      const [formData, setFormData] = useState({ name: '', description: '',price:'',category:'',stock:'',image:null});
      
      useEffect(()=>{
        const fetchProduct = async()=>{
            if(id)
            {
            try {
                const res = await axios.get(`http://localhost:5000/api/v1/artist/product/getProductById/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setFormData({
                name: res.data.name,
                description: res.data.description,
                price: res.data.price,
                category: res.data.category,
                stock: res.data.stock,
                image: res.data.image||null,
            });
            }
            catch(error){
                console.error(err.response?.data?.error || err.message);
                toast.error("Failed to fetch product details");
            }
        }
    };
    fetchProduct();
    },[id,token]);
    
      const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
      const handleFileChange = (e) =>setFormData({ ...formData, image: e.target.files[0] });

      const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.name || !formData.description || !formData.category || !formData.price || !formData.stock) {
        //return toast.error('All fields are required');
        toast.error('All fields are required');
        return;
      }
      //const token = localStorage.getItem("token");
      if(!token){
        toast.error("Login again");
        return;
      }
      try {
          const data = new FormData();
          data.append("name", formData.name);
          data.append("description", formData.description);
          data.append("category", formData.category);
          data.append("price", formData.price);
          data.append("stock", formData.stock);
           if (formData.image instanceof File) {
                // New uploaded file
                data.append("image", formData.image);
            } else if (typeof formData.image === "string") {
                // Existing image path
                data.append("image", formData.image);
            }
          
           await axios.put(
            `http://localhost:5000/api/v1/artist/product/updateProduct/${id}`,
            data,
            { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Product updated successfully");
            navigate("/artistdashboard");
        
      } catch (err) {
        console.log(err.response?.data?.error)
        toast.error("Faild to Update Product");
        
      }
    };

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
            Update Product
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 font-medium">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                value={formData.name}
                name="name"
                onChange={handleChange}
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
                value={formData.description}
                name="description"
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium">Category</label>
              <select
                value={formData.category}
                name="category"
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                <option value="Painting">Painting</option>
                <option value="Art">Art</option>
                <option value="Candels">Candels</option>
                <option value="Lamps">Lamps</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 font-medium">Price (₹)</label>
              <input
                type="number"
                value={formData.price}
                placeholder="Enter price"
                name="price"
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-gray-700 font-medium">Stock</label>
              <input
                type="Number"
                placeholder="Enter available stock"
                value={formData.stock}
                name="stock"
                onChange={handleChange}
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
                name="image"
                onChange={handleFileChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              {id && typeof formData.image === "string" && (
                <img
                src={formData.image}
                alt="Current product"
                className="mt-2 w-32 h-32 object-cover rounded-lg border"
                />
          )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Artist;
