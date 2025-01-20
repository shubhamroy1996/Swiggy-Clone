import React, { useEffect, useState } from "react";
import BrowseByCuisine from "./Cuisine-Section/BrowseByCuisine";
import AllRestaurantDelivery from "./Restaurant-Section/AllRestaurantDelivery";
import TopRestaurant from "./Restaurant-Section/TopRestaurant";

function Body() {
    const [browseByCuisineData, setBrowseByCuisineData] = useState([]);
    const [restaurantListData, setRestaurantListData] = useState([])
    const [allRestaurantListData, setAllRestaurantListData] = useState([])
  

  async function FetchData() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9566294&lng=77.70468230000002&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const result = await data.json();
    // console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setBrowseByCuisineData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
    setRestaurantListData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    //setAllRestaurantListData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    console.log(result?.data);

  }

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="w-[75%] mx-auto mt-3 overflow-hidden">
      <BrowseByCuisine  data={browseByCuisineData}/>
      <TopRestaurant data = {restaurantListData}/>
      <AllRestaurantDelivery data={restaurantListData} />

    </div>
  );
}

export default Body;
