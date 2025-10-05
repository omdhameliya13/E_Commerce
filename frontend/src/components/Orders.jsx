import React,{useState,useEffect} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if(!token){
    navigate("/login-user");
    toast.error("Please Login First");
  }
  const[orders,setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useEffect(()=>{
    const fetchOrders = async()=>{
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/user/order/getOrder/?page=${page}&limit=10`,{
          headers:{Authorization:`Bearer ${token}`}
        });
        console.log(res.data);
        setTotalPages(res.data.totalPages);
        setOrders(res.data.orders || []);
      } catch (error) {
        console.log(error.res?.data?.error);
        toast.error("Failed to fetch Orders");
      }
    }
    fetchOrders();
  },[page,token]);
  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Your Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">No orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Total Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
                {/*<th className="px-6 py-3">Action</th>*/}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) =>
                order.products.map((product, idx) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* Order ID only for the first product row */}
                    <td className="px-6 py-3">
                      {idx === 0 ? order._id : ""}
                    </td>
                    <td className="px-6 py-3 flex items-center gap-2">
                      <img
                        src={`http://localhost:5000/${product.productId?.image}`}
                        alt={product.productId?.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      {product.productId?.name}
                    </td>
                    <td className="px-6 py-3">{product.quantity}</td>
                    {/* Show totalAmount only for the first product row */}
                    <td className="px-6 py-3">
                      {idx === 0 ? `₹${order.totalAmount}` : ""}
                    </td>
                    <td
                      className={`px-6 py-3 font-semibold ${
                        order.status === "Cancelled"
                          ? "text-red-500"
                          : order.status === "Completed"
                          ? "text-green-600"
                          : "text-yellow-500"
                      }`}
                    >
                      {idx === 0 ? order.status : ""}
                    </td>
                    <td className="px-6 py-3">
                      {idx === 0 ? new Date(order.createdAt).toLocaleDateString() : ""}
                    </td>
                    {/*<td className="px-6 py-3">
                      {idx === 0 && order.status === "Pending" && (
                        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs">
                          Cancel
                        </button>
                      )}
                      {idx === 0 && order.status === "Completed" && (
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs">
                          Reorder
                        </button>
                      )}
                      {idx === 0 && order.status === "Cancelled" && (
                        <span className="text-gray-400 text-xs">No Action</span>
                      )}
                    </td>*/}
                  </tr>
                ))
              )}
            </tbody>
          </table>
            <div className="flex justify-center items-center gap-4 py-4">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg shadow ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-lg shadow ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
              >
                Next
              </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
