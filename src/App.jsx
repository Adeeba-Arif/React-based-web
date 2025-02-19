import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchProducts } from "./slices/productSlice";
import LoginPage from "./pages/LoginPage";
import {NavBar} from "./customComponents/NavBar";
import {HomePage} from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import ProductPage from "./pages/ProductPage";
import ContactPage from "./pages/ContactPage";
import {SignUp} from "./pages/SignUp";
import FavPage from "./pages/FavPage";
import CartPage from "./pages/CartPage";
import Footer from "./customComponents/FooterCard";
import CopyRightCard from "./customComponents/CopyRightCard";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage/>} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/favorites" element={<FavPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
      <CopyRightCard/>
    </>
  );
}

export default App;