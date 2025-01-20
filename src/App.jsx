import React from "react";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";

import { Route, Routes } from "react-router-dom";
import RestaurantMenu from "./components/Body/Restaurant-Menu/RestaurantMenu";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<Body />} />
        <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
      </Route>
    </Routes>
  );
}

export default App;
