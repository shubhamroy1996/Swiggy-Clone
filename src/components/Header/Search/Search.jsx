import React, { useContext, useEffect, useState } from "react";
import SearchRestaurant, { withHoc } from "./SearchRestaurant";

import Dish from "./Dish";
import { useDispatch, useSelector } from "react-redux";
import { Coordinates } from "../../../context/contextApi";


function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dishes, setDishes] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [selectedRestaurantDish, setSelectedRestaurantDish] = useState(null);
  const [similarRestaurantDishes, setSimilarRestaurantDishes] = useState([]);

  const {
    coordinate: { latitude, longitude },
  } = useContext(Coordinates);

  const PromotedRestaurant = withHoc(SearchRestaurant);

  const filterOptions = ["Restaurant", "Dishes"];

  const [activeBtn, setActiveBtn] = useState("Dishes");

  const dispatch = useDispatch();

  const { isSimiliarRestaurantDishes, city, resId, itemId, resLocation } =
    useSelector((state) => state.toggleSlice.similarRestaurantDish);

  function handleFilterBtn(filterName) {
    setActiveBtn(activeBtn === filterName ? activeBtn : filterName);
  }

  async function fetchDishes() {
    let data = await fetch(
      `${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${latitude}&lng=${longitude}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0`
    );
    const res = await data.json();
    console.log(res);
    let finalResponse = res?.data?.cards
      ?.find((data) => data?.groupedCard)
      .groupedCard?.cardGroupMap?.DISH?.cards?.filter((data) =>
        data?.card?.card?.["@type"]?.includes("food.v2.Dish")
      );
    setDishes(finalResponse);
  }

  async function fetchRestaurant() {
    let data = await fetch(
      `${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${latitude}&lng=${longitude}&str=${searchQuery}&trackingId=4836a39e-ca12-654d-dc3b-2af9d645f8d7&submitAction=ENTER&queryUniqueId=7abdce29-5ac6-7673-9156-3022b0e032f0&selectedPLTab=RESTAURANT`
    );
    const res = await data.json();
    const finalResponse =
      (res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(
        (data) => data?.card?.card?.info
      );
    setRestaurantData(finalResponse);
  }

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    fetchDishes(), fetchRestaurant();
  }, [searchQuery]);

  function handleSearchQuery(event) {
    let value = event.target.value;
    if (event.keyCode === 13) {
      setSearchQuery(value);
      setSelectedRestaurantDish(null);
      setDishes([]);
    }
  }

  useEffect(() => {
    if (isSimiliarRestaurantDishes) {
      fetchSimilarRestaurantDishes();
    }
  }, [isSimiliarRestaurantDishes]);

  async function fetchSimilarRestaurantDishes() {
    let pathname = `/city/${city}/${resLocation}`;
    let encodedPath = encodeURIComponent(pathname);
    let data = await fetch(
        `${import.meta.env.VITE_BASE_URL}/restzaurants/search/v3?lat=${latitude}&lng=${longitude}&str=${searchQuery}&trackingId=null&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`
    );
    let res = await data.json();
    // console.log("res", res);
    // console.log(res?.data?.cards);
    // console.log(res?.data?.cards[1])
    setSelectedRestaurantDish(res?.data?.cards[1]);
    // console.log(res?.data?.cards[2]?.card?.card?.cards)
    setSimilarRestaurantDishes(res?.data?.cards[2]?.card?.card?.cards);
    dispatch(resetSimilarRestaurantDish());
  }

  return (
    <div className="w-full mt-10 md:w-[800px] mx-auto">
      <div className="w-full relative">
        <i className="fi fi-rr-angle-small-left text-2xl ml-2 mt-1 absolute top-1/2 -translate-y-1/2"></i>
        <i className="fi fi-rr-search absolute top-1/2 right-0 -translate-y-1/2 mr-5"></i>
        <input
          //onKeyDown={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchQuery}
          className="border-2 w-full pl-8 py-3 text-xl focus:outline-none"
          type="text"
          placeholder="Search for restaurant and food"
        />
      </div>

      {!selectedRestaurantDish && (
        <div className="my-7 flex flex-wrap gap-3">
          {filterOptions.map((filterName, i) => (
            <button
              key={i}
              onClick={() => handleFilterBtn(filterName)}
              className={
                "filterBtn flex gap-2" +
                (activeBtn === filterName ? "active" : "")
              }
            >
              <p>{filterName}</p>
            </button>
          ))}
        </div>
      )}

      <div className="w-full md:w-[800px] mt-5  grid grid-cols-1 md:grid-cols-2   bg-[#f4f5f7]">
        {selectedRestaurantDish ? (
          <>
            <div>
              <p className="p-4">Item added to cart</p>
              <Dish data={selectedRestaurantDish.card.card} />
              <p className="p-4">More dishes from this restaurant</p>
            </div>
            <br />

            {similarRestaurantDishes.map((data, i) => (
              <Dish
                key={i}
                data={{
                  ...data.card,
                  restaurant: selectedRestaurantDish.card.card.restaurant,
                }}
              />
            ))}
          </>
        ) : activeBtn === "Dishes" ? (
          dishes.map((data, i) => <Dish key={i} data={data.card.card} />)
        ) : (
          restaurantData.map((data, i) =>
            data?.card?.card?.info?.promoted ? (
              <PromotedRestaurant data={data} key={i} />
            ) : (
              <SearchRestaurant data={data} key={i} />
            )
          )
        )}
      </div>
    </div>
  );
}

export default Search;
