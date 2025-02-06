import React, { useState } from "react";

import MenuList from "./MenuList";

function RestaurantMenuCard({ menuData, topPick, restaurantInfo }) {
  const [value, setValue] = useState(0);
  let newData = topPick?.card?.card?.carousel;

  function scrollLeftSide() {
    value <= 0 ? "" : setValue((prev) => prev - 31);
  }

  function scrollRightSide() {
    value >= 124 ? "" : setValue((prev) => prev + 31);
  }

  return (
    <>
      <h2 className="text-center mt-8 leading-5">M E N U</h2>
      <div className="w-[800px] mt-5 relative">
        <button className="w-full h-[48px] p-3 font-bold text-lg text-slate-500 bg-gray-100 rounded-xl">
          Search for dishes
          <i className=" fi fi-rr-search absolute top-3 right-4"></i>
        </button>

        <hr className="border mt-10" />
      </div>

      {topPick && (
        <>
          <div className=" w-full overflow-hidden">
            <div className="flex justify-between mt-8">
              <h1 className="font-bold mt-4 text-[20px] ml-3">
                {topPick.card.card.title}
              </h1>

              <div className="flex gap-3">
                <div
                  onClick={scrollLeftSide}
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
              className=" flex gap-4 mt-5"
            >
              {newData.map((data, i) => {
                return (
                  <div key={i} className="min-w-[310px] relative h-[315px]">
                    <img
                      className="w-full h-full"
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${data?.creativeId}`}
                      alt=""
                    />

                    <div className="absolute bottom-4 text-white flex justify-between w-full px-4">
                      <button className="px-10 py-2 font-bold text-green-400 bg-white rounded-xl">
                        ADD
                      </button>

                      <p className="font-bold mt-2">
                        {" "}
                        ₹
                        {data?.dish?.info?.price / 100 ||
                          data?.dish?.info?.defaultPrice / 100}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <hr className="border h-[16px] bg-gray-100 mt-8" />
        </>
      )}

      <div className="w-[800px] mx-auto pt-8">
        {menuData.map(({ card: { card } }) => (
          <MenuList card={card} restaurantInfo={restaurantInfo}/>
        ))}
      </div>
    </>
  );
}

export default RestaurantMenuCard;
