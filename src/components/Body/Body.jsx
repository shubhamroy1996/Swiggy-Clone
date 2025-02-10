import React, { useContext, useEffect, useState } from "react";
import BrowseByCuisine from "./Cuisine-Section/BrowseByCuisine";
import AllRestaurantDelivery from "./Restaurant-Section/AllRestaurantDelivery";
import TopRestaurant from "./Restaurant-Section/TopRestaurant";
import { Coordinates } from "../../context/contextApi";
import { useSelector } from "react-redux";

function Body() {
  const [browseByCuisineData, setBrowseByCuisineData] = useState([]);
  const [restaurantListData, setRestaurantListData] = useState([]);
  const [topRestaurantTitle, setTopRestaurantTitle] = useState("");
  const [onlineRestaurantTitle, setOnlineRestaurantTitle] = useState("");
  const [unserviceable, setUnserviceable] = useState([]);

  const {
    coordinate: { latitude, longitude },
  } = useContext(Coordinates);
  const filterVal = useSelector((state) => state?.filterSlice?.filterVal);

  async function FetchData() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const result = await data.json();
    // console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setBrowseByCuisineData(
      result?.data?.cards[0]?.card?.card?.imageGridCards?.info
    );
    setUnserviceable(result.data);
    setRestaurantListData(
      result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setTopRestaurantTitle(result?.data?.cards[1]?.card?.card?.header?.title);
    setOnlineRestaurantTitle(result?.data?.cards[2]?.card?.card?.title);
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

  const filteredData = restaurantListData.filter((item) => {
    if (!filterVal) return true;

    switch (filterVal) {
      case "Ratings 4.0+":
        return item?.info?.avgRating > 4;
      case "Rs. 300-Rs. 600":
        return (
          item?.info?.costForTwo?.slice(1, 4) >= "300" &&
          item?.info?.costForTwo?.slice(1, 4) <= "600"
        );
      case "Offers":
        return;
      case "Less than Rs. 300":
        return item?.info?.costForTwo?.slice(1, 4) < "300";
      default:
        return true;
    }
  });

  return (
   
      <div className="w-[95%] md:w-[75%] mx-auto mt-3 overflow-hidden">
        <BrowseByCuisine data={browseByCuisineData} />
        <TopRestaurant data={restaurantListData} title={topRestaurantTitle} />
        <AllRestaurantDelivery
          data={filterVal ? filteredData : restaurantListData}
          title={onlineRestaurantTitle}
        />
      </div>
   
  );
}

export default Body;
