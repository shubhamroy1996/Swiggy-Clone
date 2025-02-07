import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import { Coordinates, CartContext } from "./context/contextApi";

import { Route, Routes } from "react-router-dom";
import RestaurantMenu from "./components/Body/Restaurant-Menu/RestaurantMenu";
import Cart from "./components/Body/Cart/Cart";
import { useSelector } from "react-redux";
import SignIn from "./components/Header/SignIn";

function App() {
  const [coordinate, setcoordinate] = useState({
    latitude: 28.7040592,
    longitude: 77.10249019999999,
  });

  const visible = useSelector((state) => state.toggleSlice.searchBarToggle);

  return (
    <Coordinates.Provider value={{ coordinate, setcoordinate }}>
      <div className={visible ? "max-h-screen overflow-hidden" : ""}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<Body />} />
            <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signIn" element={<SignIn />} />

            <Route
              path="*"
              element={
                <h1 className="items-center text-center my-14">
                  Coming Soon...
                </h1>
              }
            />
          </Route>
        </Routes>
      </div>
    </Coordinates.Provider>
  );
}

export default App;
