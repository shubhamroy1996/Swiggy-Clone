import React from "react";
import RestaurantList from "./RestaurantList";

function AllRestaurantDelivery({ data }) {
  return (
    <>
      <div className="flex justify-between mt-5 rounded-lg">
        <h2 className="text-2xl font-bold ">
          Restaurants with online food delivery in Bangalore
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 mt-4">
        <RestaurantList data={data} />
      </div>
    </>
  );
}

export default AllRestaurantDelivery;
