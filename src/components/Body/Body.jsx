import React, { useContext, useEffect, useState } from "react";
import BrowseByCuisine from "./Cuisine-Section/BrowseByCuisine";
import AllRestaurantDelivery from "./Restaurant-Section/AllRestaurantDelivery";
import TopRestaurant from "./Restaurant-Section/TopRestaurant";
import { Coordinates } from "../../context/contextApi";

function Body() {
  const [browseByCuisineData, setBrowseByCuisineData] = useState([]);
  const [restaurantListData, setRestaurantListData] = useState([]);
  const [allRestaurantListData, setAllRestaurantListData] = useState([]);
  const [topRestaurantTitle, setTopRestaurantTitle] = useState("")
  const [onlineRestaurantTitle, setOnlineRestaurantTitle] = useState("")
  const [unserviceable, setUnserviceable] = useState([])


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
    setUnserviceable(result.data)
    setRestaurantListData(
      result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setTopRestaurantTitle(result?.data?.cards[1]?.card?.card?.header?.title)
    setOnlineRestaurantTitle(result?.data?.cards[2]?.card?.card?.title)
  }

  useEffect(() => {
    FetchData();
  }, [latitude, longitude]);

  if (unserviceable.communication || unserviceable.tid == "") {
    return (
        <div className="flex mt-44 overflow-hidden justify-center items-center flex-col">
            <img
                className="w-72"
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
                alt=""
            />
            <h1>Location unservicalbe</h1>
        </div>
    );
}

  return (
    <div className="w-[75%] mx-auto mt-3 overflow-hidden">
      <BrowseByCuisine data={browseByCuisineData}/>
      <TopRestaurant data={restaurantListData} title={topRestaurantTitle}/>
      <AllRestaurantDelivery data={restaurantListData} title = {onlineRestaurantTitle}/>
    </div>
  );
}

export default Body;
