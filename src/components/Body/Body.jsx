import React, { useContext, useEffect, useState } from "react";
import BrowseByCuisine from "./Cuisine-Section/BrowseByCuisine";
import AllRestaurantDelivery from "./Restaurant-Section/AllRestaurantDelivery";
import TopRestaurant from "./Restaurant-Section/TopRestaurant";
import { Coordinates } from "../../context/contextApi";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer/Shimmer";

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
      `${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const result = await data.json();

    setUnserviceable(result.data);
    setBrowseByCuisineData(
      result?.data?.cards.find(
        (data) => data?.card?.card?.id == "whats_on_your_mind"
      )?.card?.card?.imageGridCards?.info
    );
    let restaurantGridDataList = result?.data?.cards.find(
      (data) => data?.card?.card?.id == "top_brands_for_you"
    )?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setRestaurantListData(restaurantGridDataList);
    setTopRestaurantTitle(
      result?.data?.cards.find(
        (data) => data?.card?.card?.id == "top_brands_for_you"
      )?.card?.card?.header?.title
    );
    setOnlineRestaurantTitle(
      result?.data?.cards.find(
        (data) => data?.card?.card?.id == "popular_restaurants_title"
      )?.card?.card?.title
    );

    // setBrowseByCuisineData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
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
    <>
      {restaurantListData.length ? (
        <>
          <div className="w-[95%] h-[253px] md:w-[75%] mx-auto mt-3 overflow-hidden">
            <BrowseByCuisine data={browseByCuisineData} />
          </div>
          <div className="w-[95%] md:w-[75%] mx-auto mt-3 overflow-hidden">
            <TopRestaurant
              data={restaurantListData}
              title={topRestaurantTitle}
            />
            <AllRestaurantDelivery
              data={filterVal ? filteredData : restaurantListData}
              title={onlineRestaurantTitle}
            />
          </div>
        </>
      ) : (
        <Shimmer />
      )}
    </>
  );
}

export default Body;
