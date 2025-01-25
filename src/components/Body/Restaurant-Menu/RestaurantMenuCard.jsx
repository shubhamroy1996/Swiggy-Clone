import React from "react";
import MenuList from "./MenuList";


function RestaurantMenuCard({ menuData }) {

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

      <div className="w-[800px] mx-auto pt-8">
        {menuData.map(({ card: { card } }) => (
          <MenuList card={card} />
        ))}
      </div>
    </>
  );
}

export default RestaurantMenuCard;
