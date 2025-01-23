import React, { useState } from "react";

function RestaurantMenuCard({ menuData }) {
  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      <h2 className="text-center mt-8 leading-5">M E N U</h2>
      <div className="w-full mt-5 relative">
        <button className="w-full h-[48px] p-3 font-bold text-lg text-slate-500 bg-gray-100 rounded-xl">
          Search for dishes
          <i className=" fi fi-rr-search absolute top-3 right-4"></i>
        </button>

        <hr className="border mt-10" />
      </div>

      <div className="w-[810px] mx-auto pt-8">
        {/* <h2 className="font-bold ml-2 text-lg">
          {menuData[0]?.card?.card?.title}(
          {menuData[0]?.card?.card?.itemCards?.length})
        </h2> */}

        {/* {menuData.map(
          ({card: {card: { itemCards, title } },i}) => (
            <>
              <div className="flex justify-between">
                <h1 className="font-bold ml-2 text-lg">
                  {title}({itemCards.length})
                </h1>
                <i className="fi text-2xl fi-rr-angle-small-up" onClick={() => toggleDropDown()}></i>
              </div>

              { dropDown && 
                <div className="mt-3">
                {itemCards.map(({ card: { info } }) => {
                  return <h1 className="font-2xl font-bold">{info?.name}</h1>;
                })}
              </div>
}
            </>
          )
        )} */}
      </div>

      <div className="w-[810px] mx-auto pt-8">
        {menuData.map(
          ({
            card: {
              card: { itemCards, title },
            },
          }) => (
            <DetailedMenu title={title} itemCards={itemCards} />
          )
        )}
      </div>
    </>
  );
}

function DetailedMenu({ title, itemCards }) {
  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1 className="font-bold ml-2 text-lg">
            {title}({itemCards.length})
          </h1>
        </div>
        <MenuSection itemCards={itemCards} />
      </div>
    </>
  );
}

function MenuSection({ itemCards }) {
  return (
    <div className="mt-5">
      {itemCards.map(({ card: { info } }) => (
        <div className=" ml-3 w-full h-[172px]  overflow-auto relative ">
          <div className="w-[553px]">
            <h1 className="font-bold text-lg text-gray-700">{info?.name}</h1>
            <h1>{info?.price}</h1>
            <p className=" mt-2 w-[552px]">{info?.description}</p>
          </div>
          
          <img
            className=" h-[144px] w-[156px] rounded-2xl absolute "
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${info.imageId}`}
          />
          
        </div>
      ))}
    </div>
  );
}

export default RestaurantMenuCard;
