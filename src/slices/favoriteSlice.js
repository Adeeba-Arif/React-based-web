import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favoriteProducts: [],
    message: "",
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const existingIndex = state.favoriteProducts.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.favoriteProducts.splice(existingIndex, 1);
        state.message = "Removed from favorites";
      } else {
        state.favoriteProducts.push(action.payload);
        state.message = "Added to favorites";
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
