import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DiscountData from "./DiscountData";
import RestaurantInfo from "./RestaurantInfo";

function RestaurantMenu() {
  const [menuData, setMenuData] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);

  const { id } = useParams();
  let newId = id.split("rest")[1];

  async function fetchMenu() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9566294&lng=77.70468230000002&restaurantId=${newId}&catalog_qa=undefined&submitAction=ENTER`
    );
    const result = await data.json();
    console.log(result?.data?.cards[2]?.card?.card?.info);
    console.log(
      "********",
      result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    setRestaurantInfo(result?.data?.cards[2]?.card?.card?.info);
    setDiscountData(
      result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    setMenuData(result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR);
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="w-[810px] mx-auto pt-8">
          <RestaurantInfo restaurantInfo={restaurantInfo} />

          <DiscountData discountData={discountData} />
        </div>
      </div>
    </>
  );
}

export default RestaurantMenu;
