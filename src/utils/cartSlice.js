import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartValue")) || [],
    restaurantInfo: JSON.parse(localStorage.getItem("restaurantInfo")) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { info, restaurantInfo } = action.payload;
      state.cartItems = [...state.cartItems, info];
      localStorage.setItem("cartValue", JSON.stringify(state.cartItems));
      localStorage.setItem("restaurantInfo", JSON.stringify(restaurantInfo));
    },
    deleteFromCart: (state, action) => {
      state.cartItems = action.payload;
      localStorage.setItem("cartValue", JSON.stringify(action.payload));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.restaurantInfo = []
      localStorage.removeItem("cartValue");
      localStorage.removeItem("restaurantInfo");
    },
  },
});

export const { addToCart, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
