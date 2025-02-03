import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import { Visibility, Coordinates, CartContext } from "./context/contextApi";

import { Route, Routes } from "react-router-dom";
import RestaurantMenu from "./components/Body/Restaurant-Menu/RestaurantMenu";
import Cart from "./components/Body/Cart/Cart";

function App() {
  const [visible, setVisible] = useState(false);
  const [cartValue, setCartValue] = useState([])
  const [coordinate, setcoordinate] = useState({
    latitude: 28.7040592,
    longitude: 77.10249019999999,
  });

  function getDataFromLocalStorage()
 {
  let data = JSON.parse(localStorage.getItem("cartValue")) || []
  setCartValue(data)
 }

 useEffect(()=>{getDataFromLocalStorage()},[])

  return (
  <CartContext.Provider value={{cartValue, setCartValue}}>
    <Coordinates.Provider value={{ coordinate, setcoordinate }}>
      <Visibility.Provider value={{ visible, setVisible }}>
        <div className={visible ? "max-h-screen overflow-hidden" : ""}>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="/" element={<Body />} />
              <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<h1 className="items-center text-center my-14">Coming Soon...</h1>} />


            </Route>
          </Routes>
        </div>
      </Visibility.Provider>
    </Coordinates.Provider>
  </CartContext.Provider>
  );
}

export default App;
