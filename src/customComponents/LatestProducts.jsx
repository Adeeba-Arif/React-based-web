import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/slices/productSlice";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../slices/CartSlice";
import { toggleFavorite } from "@/slices/favoriteSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../FirebaseConfig";

export const LatestProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
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

  return (
    <div className="flex flex-col px-8 gap-5 md:gap-10 py-5 xl:px-[12rem] md:py-10">
      <h1 className="text-center font-bold text-blue-950 text-xl md:text-3xl mb-6">
        Latest Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => {
          const isFavorite = favoriteProducts.some((item) => item.id === product.id);
          return (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative group"
            >
              <div
                className="h-48 bg-gray-100 bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${product.images?.[0] || "/placeholder-image.png"})` }}
              >
                <div className="absolute top-2 left-2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FiShoppingCart onClick={() => handleCartToggle(product)} className="text-2xl text-white hover:text-green-500 cursor-pointer" />
                  {isFavorite ? (
                    <FaHeart onClick={() => handleFavoriteToggle(product)} className="text-2xl text-red-500 cursor-pointer" />
                  ) : (
                    <FaRegHeart onClick={() => handleFavoriteToggle(product)} className="text-2xl text-white hover:text-pink-500 cursor-pointer" />
                  )}
                  <IoSearch onClick={() => handleViewDetails(product.id)} className="text-2xl text-white hover:text-gray-500 cursor-pointer" />
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-blue-600">
                  {product.title}
                </h3>
                <p className="text-xl font-bold text-blue-600">
                  ${product.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestProducts;
