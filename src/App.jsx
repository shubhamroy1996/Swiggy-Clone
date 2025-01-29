import React, { useState } from "react";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import { Visibility, Coordinates } from "./context/contextApi";

import { Route, Routes } from "react-router-dom";
import RestaurantMenu from "./components/Body/Restaurant-Menu/RestaurantMenu";

function App() {
  const [visible, setVisible] = useState(false);
  const [coordinate, setcoordinate] = useState({
    latitude: 28.7040592,
    longitude: 77.10249019999999,
  });

  return (
    <Coordinates.Provider value={{ coordinate, setcoordinate }}>
      <Visibility.Provider value={{ visible, setVisible }}>
        <div className={visible ? "max-h-screen overflow-hidden" : ""}>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path="/" element={<Body />} />
              <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
            </Route>
          </Routes>
        </div>
      </Visibility.Provider>
    </Coordinates.Provider>
  );
}

export default App;
