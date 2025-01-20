import React, { useState } from "react";
import RestaurantList from "./RestaurantList";

function TopRestaurant({ data }) {
  const [value, setValue] = useState(0);

  function scrollLeftSide() {
    value <= 0 ? "" : setValue((prev) => prev - 31);
  }

  function scrollRightSide() {
    value >= 124 ? "" : setValue((prev) => prev + 31);
  }

  return (
    <>
      <div className="flex justify-between mt-5 rounded-lg">
        <h2 className="text-2xl font-bold ">
          Top restaurant chains in Bangalore
        </h2>
        <div className="flex gap-3">
          <div
            onClick={scrollLeftSide}
            // className=" bg-gray-200 cursor-pointer rounded-full w-9 h-9 flex justify-center items-center">
            className={
              ` cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` +
              (value <= 0 ? "bg-gray-100" : "bg-gray-200")
            }
          >
            <i
              className={
                `fi text-2xl mt-1 fi-rr-arrow-small-left ` +
                (value <= 0 ? "text-gray-300" : "text-gray-800")
              }
            ></i>
          </div>
          <div
            onClick={scrollRightSide}
            // className="bg-gray-200 cursor-pointer rounded-full w-9 h-9 flex justify-center items-center "
            className={
              ` cursor-pointer rounded-full w-9 h-9 flex justify-center items-center ` +
              (value >= 124 ? "bg-gray-100" : "bg-gray-200")
            }
          >
            <i
              className={
                `fi text-2xl mt-1 fi-rr-arrow-small-right ` +
                (value >= 124 ? "text-gray-300" : "text-gray-800")
              }
            ></i>
          </div>
        </div>
      </div>
      <div
        style={{ translate: `-${value}%` }}
        className={`flex mt-4 gap-6  duration-300 `}
      >
        {data.map(({ info, cta: { link } }) => (
          <div className="hover:scale-95 duration-200" key={info?.id}>
            <RestaurantList {...info} link={link} />
          </div>
        ))}
      </div>
      <hr className="border" />
    </>
  );
}

export default TopRestaurant;
