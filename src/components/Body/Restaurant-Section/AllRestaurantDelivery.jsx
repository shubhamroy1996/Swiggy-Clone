import React, { useState } from "react";
import RestaurantList from "./RestaurantList";
import { useDispatch } from "react-redux";
import { setFilterValue } from "../../../utils/filterSlice";

function AllRestaurantDelivery({ data, title }) {
  const filterOptions = [
    "Ratings 4.0+",
    "Rs. 300-Rs. 600",
    "Offers",
    "Less than Rs. 300",
  ];

  const [activeBtn, setActiveBtn] = useState(null);

  const dispatch = useDispatch();

  function handleFilterBtn(filterName) {
    setActiveBtn(activeBtn === filterName ? null : filterName);
  }
  dispatch(setFilterValue(activeBtn));

  return (
    <>
      <div className="flex justify-between mt-5 rounded-lg">
        <h2 className="text-2xl font-bold ">{title}</h2>
        <div className="my-7 flex flex-wrap gap-3">
          {filterOptions.map((filterName, i) => (
            <button
              key={i}
              onClick={() => handleFilterBtn(filterName)}
              className={
                "filterBtn flex gap-2 " +
                (activeBtn === filterName ? "active" : "")
              }
            >
              <p>{filterName}</p>
              <i className="fi text-sm mt-1 fi-br-cross hidden"></i>
            </button>
          ))}
        </div>
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
