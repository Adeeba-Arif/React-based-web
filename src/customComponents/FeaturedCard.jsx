/* FeaturedCard.jsx - Enhanced with Toast Messages and Guest Restriction */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../slices/CartSlice";
import { toggleFavorite } from "../slices/favoriteSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../FirebaseConfig";

const FeaturedCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products = [], isLoading, message } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  const { favoriteProducts } = useSelector((state) => state.favorite);
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
  }, [dispatch, auth]);

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCartToggle = (product) => {
    if (!isAuthenticated) {
      toast.warn("Please sign up to add items to cart", { position: "top-right" });
      navigate("/signup");
    } else {
      const isInCart = cartItems.some((item) => item.id === product.id);
      if (isInCart) {
        dispatch(removeFromCart(product));
        toast.error("Removed from cart", { position: "top-right" });
      } else {
        dispatch(addToCart(product));
        toast.success("Added to cart", { position: "top-right" });
      }
    }
  };

  const handleFavoriteToggle = (product) => {
    if (!isAuthenticated) {
      toast.warn("Please sign up to add items to favorites", { position: "top-right" });
      navigate("/signup");
    } else {
      dispatch(toggleFavorite(product));
      const isFavorite = favoriteProducts.some((item) => item.id === product.id);
      toast.info(isFavorite ? "Removed from favorites" : "Added to favorites", { position: "top-right" });
    }
  };

  if (isLoading) {
    return <p className="text-center text-blue-950">Loading...</p>;
  }

  if (message) {
    return <p className="text-center text-red-500">{message}</p>;
  }

  return (
    <div className="flex flex-col px-8 gap-5 md:gap-10 py-5 xl:px-[12rem] md:py-10">
      <h1 className="text-center font-bold text-blue-950 text-xl md:text-3xl mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-5 gap-y-8 md:gap-x-8">
        {products.slice(4, 8).map((product) => {
          const isFavorite = favoriteProducts.some((item) => item.id === product.id);
          return (
            <div key={product.id} className="flex flex-col border rounded-lg hover:shadow-2xl shadow-md group cursor-pointer transition-all bg-white h-[25rem]">
              <div className="relative border-b bg-[#f6f7fb] rounded-t-lg h-[70%] overflow-hidden">
                <img src={product.images?.[0] || "/placeholder-image.png"} alt={product.title} className="h-full w-full object-cover" />
                <div className="absolute top-2 left-2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FiShoppingCart onClick={() => handleCartToggle(product)} className="text-2xl text-white hover:text-green-500 cursor-pointer" />
                  {isFavorite ? (
                    <FaHeart onClick={() => handleFavoriteToggle(product)} className="text-2xl text-red-500 cursor-pointer" />
                  ) : (
                    <FaRegHeart onClick={() => handleFavoriteToggle(product)} className="text-2xl text-white hover:text-pink-500 cursor-pointer" />
                  )}
                  <IoSearch onClick={() => handleViewDetails(product.id)} className="text-2xl text-white hover:text-purple-500 cursor-pointer" />
                </div>
              </div>
              <div className="flex flex-col h-[30%] justify-center items-center py-3 gap-2 group-hover:bg-blue-950 transition-all rounded-b-lg">
                <h3 className="text-medium font-semibold group-hover:text-white text-blue-950 text-center">{product.title}</h3>
                <p className="group-hover:text-white text-blue-950 font-medium">Code: {product.id}</p>
                <span className="group-hover:text-white text-blue-950 text-xl font-bold">${product.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedCard;
