import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DiscountData from "./DiscountData";
import RestaurantInfo from "./RestaurantInfo";
import RestaurantMenuCard from "./RestaurantMenuCard";

function RestaurantMenu() {
  const [menuData, setMenuData] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [topPick, setTopPick] = useState({})

  const { id } = useParams();
  let newId = id.split("rest")[1];

  async function fetchMenu() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=${newId}&catalog_qa=undefined&submitAction=ENTER`
    );
    const result = await data.json();
    //console.log(result?.data?.cards[2]?.card?.card?.info);
    
    setRestaurantInfo(result?.data?.cards[2]?.card?.card?.info);
    setDiscountData(
      result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    let actualMenu = (result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).
    filter(data => data?.card?.card?.itemCards || data?.card?.card?.categories)
    setMenuData(actualMenu);
    
    let topPickItem = ((result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(data=> data?.card?.card?.title === "Top Picks")[0])
    
    setTopPick(topPickItem)

    console.log(topPickItem)

  }

  

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="w-[810px] mx-auto pt-8">
          <RestaurantInfo restaurantInfo={restaurantInfo} />

          <DiscountData discountData={discountData} topPick= {topPick} />

          <RestaurantMenuCard menuData = {menuData}/>
        </div>
      </div>
    </>
  );
}

export default RestaurantMenu;
