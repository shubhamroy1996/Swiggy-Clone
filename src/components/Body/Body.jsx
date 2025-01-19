import React, { useEffect, useState } from "react";
import BrowseByCuisine from "./BrowseByCuisine";

function Body() {
    const [browseByCuisineData, setBrowseByCuisineData] = useState([]);
    const [restaurantListData, setRestaurantListData] = useState([])
  

  async function FetchData() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9566294&lng=77.70468230000002&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const result = await data.json();
    // console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setBrowseByCuisineData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
    setRestaurantListData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

  }

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="w-[75%] mx-auto mt-3 overflow-hidden">
      <BrowseByCuisine  data={browseByCuisineData}/>
    </div>
  );
}

export default Body;
