import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: {
    searchBarToggle: false,
    isDifferentRestaurant: false,
    loginVisible: false
  },
  reducers: {
    toggleSearchBar: (state) => {
      state.searchBarToggle = !state.searchBarToggle;
    },
    toggleDifferentRestaurant: (state) => {
      state.isDifferentRestaurant = !state.isDifferentRestaurant;
    },
    toggleLogin: (state) => {
      state.loginVisible = !state.loginVisible

    }
  },
});

export const { toggleSearchBar, toggleDifferentRestaurant, toggleLogin } =
  toggleSlice.actions;
export default toggleSlice.reducer;
