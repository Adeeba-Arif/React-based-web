/* CartPage.jsx - Enhanced UI with Remove Functionality */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../slices/CartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems = [] } = useSelector((state) => state.cart) || { cartItems: [] };

  if (cartItems.length === 0) {
    return <p className="text-center text-gray-500 text-xl mt-10">🛒 Your cart is empty. Start shopping now!</p>;
  }

  return (
    <div className="px-10 py-10 flex flex-col items-center gap-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900">Shopping Cart</h1>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-5 space-y-6">
        {cartItems.map((product) => (
          <div className="flex border-b py-4 items-center space-y-4" key={product.id}>
            <div className="w-24 h-24 flex-shrink-0">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="flex flex-col flex-grow ml-4">
              <h1 className="text-lg font-semibold text-gray-800">{product.title}</h1>
              <p className="text-sm text-gray-500">{product.description}</p>
            </div>
            <div className="text-lg font-bold text-gray-900">${product.price}</div>
            <div className="flex items-center gap-3 mx-4">
              <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">-</button>
              <span className="text-lg font-semibold">{product.quantity}</span>
              <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">+</button>
            </div>
            <div className="text-lg font-bold text-gray-900">${(product.quantity * product.price).toFixed(2)}</div>
            <button 
              className="ml-4 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={() => dispatch(removeFromCart(product))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700">Proceed to Checkout</button>
    </div>
     
  );
};

export default CartPage;
