/* Favorite.jsx - Enhanced UI with Icons */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../slices/favoriteSlice";
import { addToCart } from "../slices/CartSlice";
import { toast } from "react-toastify";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeartBroken } from "react-icons/fa";

const Favorite = () => {
  const { favoriteProducts } = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  const handleFavorite = (product) => {
    dispatch(toggleFavorite(product));
    toast.info("Removed from favorites", { position: "top-right" });
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart", { position: "top-right" });
  };

  if (favoriteProducts.length === 0) {
    return <p className="text-center text-gray-500 text-xl mt-10">💔 No favorite products yet.</p>;
  }

  return (
    <div className="flex flex-col items-center px-10 py-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Favorite Products</h1>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-5 space-y-6">
        {favoriteProducts.map((product) => (
          <div key={product.id} className="flex items-center border-b pb-4 last:border-none">
            <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded-md" />
            <div className="ml-4 flex-grow">
              <h1 className="text-lg font-semibold text-gray-800">{product.title}</h1>
              <span className="text-gray-700 font-medium">${product.price}</span>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all mr-2"
            >
              <FiShoppingCart className="text-xl" />
            </button>
            <button
              onClick={() => handleFavorite(product)}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
            >
              <FaHeartBroken className="text-xl" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
