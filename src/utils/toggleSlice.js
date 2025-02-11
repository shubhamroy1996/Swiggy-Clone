import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: {
    searchBarToggle: false,
    isDifferentRestaurant: false,
    loginVisible: false,
    similarRestaurantDish: {
      isSimiliarRestaurantDishes: false,
      city: "",
      restaurantLocation: "",
      restaurantId: "",
      itemId: "",
    },
  },
  reducers: {
    toggleSearchBar: (state) => {
      state.searchBarToggle = !state.searchBarToggle;
    },
    toggleDifferentRestaurant: (state) => {
      state.isDifferentRestaurant = !state.isDifferentRestaurant;
    },
    toggleLogin: (state) => {
      state.loginVisible = !state.loginVisible;
    },
    setSimilarRestaurantDish: (state, action) => {
      state.similarRestaurantDish = action.payload;
    },
    resetSimilarRestaurantDish: (state) => {
      state.similarRestaurantDish = {
        isSimiliarRestaurantDishes: false,
        city: "",
        resLocation: "",
        resId: "",
        itemId: "",
      };
    },
  },
});

export const {
  toggleSearchBar,
  toggleDifferentRestaurant,
  toggleLogin,
  setSimilarRestaurantDish,
  resetSimilarRestaurantDish,
} = toggleSlice.actions;
export default toggleSlice.reducer;
