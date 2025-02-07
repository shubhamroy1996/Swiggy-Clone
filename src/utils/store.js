import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice";
import cartSlice from "./cartSlice";
import filterSlice from "./filterSlice"

const store = configureStore({
    reducer : {
        toggleSlice,
        cartSlice,
        filterSlice
    }
})

export default store;