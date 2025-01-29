import React, { useContext, useEffect, useState } from "react";
import BrowseByCuisine from "./Cuisine-Section/BrowseByCuisine";
import AllRestaurantDelivery from "./Restaurant-Section/AllRestaurantDelivery";
import TopRestaurant from "./Restaurant-Section/TopRestaurant";
import { Coordinates } from "../../context/contextApi";

function Body() {
  const [browseByCuisineData, setBrowseByCuisineData] = useState([]);
  const [restaurantListData, setRestaurantListData] = useState([]);
  const [allRestaurantListData, setAllRestaurantListData] = useState([]);

  const {coordinate: { latitude, longitude },} = useContext(Coordinates);

  async function FetchData() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const result = await data.json();
    // console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setBrowseByCuisineData(
      result?.data?.cards[0]?.card?.card?.imageGridCards?.info
    );
    setRestaurantListData(
      result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  }

  useEffect(() => {
    FetchData();
  }, [latitude, longitude]);

  return (
    <div className="w-[75%] mx-auto mt-3 overflow-hidden">
      <BrowseByCuisine data={browseByCuisineData}/>
      <TopRestaurant data={restaurantListData}/>
      <AllRestaurantDelivery data={restaurantListData}/>
    </div>
  );
}

export default Body;
