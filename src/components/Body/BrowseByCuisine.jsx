import React, { useEffect, useState } from "react";

function BrowseByCuisine({data}) {
  const [value, setValue] = useState(0);

  function handleLeftPart() {
    value <= 0 ? "" : setValue((prev) => prev - 31);
  }

  function handleRightPart() {
    value >= 124 ? "" : setValue((prev) => prev + 31);
  }

  return (
    <>
      <div className="flex justify-between mt-5">
        <h2 className="text-2xl font-bold ">What's on your mind?</h2>
        <div className="flex gap-3">
          <div
            onClick={handleLeftPart}
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
            onClick={handleRightPart}
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
        className={`flex mt-4  duration-300 `}
      >
        {data.map((item) => (
          <img
            key={item.id}
            className="w-40 "
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
            alt=""
          />
        ))}
      </div>
      <hr className="border" />
    </>
  );
}

export default BrowseByCuisine;
