import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../../FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";

export const NavBar = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { favoriteProducts } = useSelector((state) => state.favorite);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/signup");
    } else {
      navigate("/cart");
    }
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      navigate("/signup");
    } else {
      navigate("/favorites");
    }
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <div className="flex items-center gap-28">
          <div className="text-2xl font-bold">
            <Link to="/" className="hover:text-gray-300">ApnaStore</Link>
          </div>
          <ul className="flex items-center gap-6">
            <li className="px-3 py-2 rounded-md hover:bg-gray-600">
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li className="px-3 py-2 rounded-md hover:bg-gray-600">
              <Link to="/products" className="hover:text-gray-300">Products</Link>
            </li>
            {!isAuthenticated && (
              <li className="px-3 py-2 rounded-md hover:bg-gray-600">
                <Link to="/login" className="hover:text-gray-300">Login</Link>
              </li>
            )}
            <li className="px-3 py-2 rounded-md hover:bg-gray-600">
              <Link to="/Contact" className="hover:text-gray-300">Contact</Link>
            </li>
            {isAuthenticated && (
              <li className="px-3 py-2 rounded-md hover:bg-red-600">
                <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
              </li>
            )}
            {!isAuthenticated && (
              <li className="px-3 py-2 rounded-md hover:bg-gray-600">
                <Link to="/signup" className="hover:text-gray-300">Sign Up</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center bg-gray-700 px-3 py-2 rounded-md">
            <input type="search" placeholder="Search" className="bg-gray-700 text-white placeholder-gray-400 focus:outline-none" />
            <IoSearch className="text-xl text-gray-400 ml-2" />
          </div>
          <button onClick={handleToggleFavorite} className="relative text-2xl hover:text-gray-300">
            <FaRegHeart />
            {favoriteProducts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {favoriteProducts.length}
              </span>
            )}
          </button>
          <button onClick={handleAddToCart} className="relative group">
            <FiShoppingCart className="text-2xl hover:text-gray-300" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
