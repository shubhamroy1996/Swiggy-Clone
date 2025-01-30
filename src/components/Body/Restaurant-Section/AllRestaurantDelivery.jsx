import React from "react";
import RestaurantList from "./RestaurantList";

function AllRestaurantDelivery({ data, title }) {
  return (
    <>
      <div className="flex justify-between mt-5 rounded-lg">
        <h2 className="text-2xl font-bold ">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 mt-4">
        {data.map(({ info, cta: { link } }) => (
          <div className="hover:scale-95 duration-200" key={info.id}>
            <RestaurantList {...info} link={link} />
          </div>
        ))}
      </div>

      <hr className="border" />
    </>
  );
}

export default AllRestaurantDelivery;
