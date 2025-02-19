import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/CartSlice";
import favoriteReducer from "./slices/favoriteSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    favorite: favoriteReducer,
    cart: cartReducer,
  },
});

export default store;