import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import DiscountData from "./DiscountData";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantMenuCard from "./RestaurantMenuCard";
import { MenuShimmer } from "../Shimmer/Shimmer";
import { Coordinates } from "../../../context/contextApi";

function RestaurantMenu() {
  const [menuData, setMenuData] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [topPick, setTopPick] = useState(null);
  const {coordinate: { latitude, longitude }} = useContext(Coordinates);

  const { id } = useParams();
  let newId = id.split("rest")[1];

  async function fetchMenu() {
    const data = await fetch(
      `${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${latitude}&lng=${longitude}&restaurantId=${newId}&catalog_qa=undefined&submitAction=ENTER`
    );
    const result = await data.json();
    //console.log(result?.data?.cards[2]?.card?.card?.info);

    setRestaurantInfo(result?.data?.cards[2]?.card?.card?.info);
    setDiscountData(
      result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    let actualMenu =
      (result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      );
    setMenuData(actualMenu);

    let topPickItem =
      (result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => data?.card?.card?.title == "Top Picks"
      )[0];
    setTopPick(topPickItem);
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <>
      <div className="w-full">
        {menuData.length ? (
          <div className="w-[810px] mx-auto pt-8">
            <RestaurantInfo restaurantInfo={restaurantInfo} />
            <DiscountData discountData={discountData} />
            <RestaurantMenuCard
              menuData={menuData}
              topPick={topPick}
              restaurantInfo={restaurantInfo}
            />
          </div>
        ) : (
          <MenuShimmer />
        )}
      </div>
    </>
  );
}

export default RestaurantMenu;
