import React from "react";
import { Link } from "react-router-dom";

function RestaurantInfo({ restaurantInfo }) {
  return (
    <div className="w-full">
      <div className="w-[810px] mx-auto">
        <p className="text-[10px] text-slate-500 ">
          {" "}
          <Link to={"/"}>
            {" "}
            <span className="hover:text-slate-700 hover:cursor-pointer">
              Home
            </span>
          </Link>{" "}
          /{" "}
          <Link to={"/"}>
            {" "}
            {/* to give extra space between / */}
            <span className="hover:text-slate-700 hover:cursor-pointer">
              {restaurantInfo?.locality}
            </span>
          </Link>{" "}
          / <span className="text-slate-700">{restaurantInfo.name}</span>
        </p>

        <h1 className="font-bold pt-6 text-2xl ml-3">{restaurantInfo.name}</h1>
        <div className="w-full h-[206px] bg-gradient-to-t px-4 pb-4 from-gray-300/70  mt-3 rounded-[30px]">
          <div className="w-full border  border-slate-200/70 rounded-[30px] h-full bg-white ">
            <div className="p-4 w-full">
              <div className="flex items-center gap-1 font-semibold">
                <i className="fi fi-ss-circle-star mt-1 text-green-600 text-lg"></i>
                <span>{restaurantInfo.avgRating}</span>
                <span>({restaurantInfo.totalRatingsString})</span>.
                <span>{restaurantInfo.costForTwoMessage}</span>
              </div>

              <p className="underline font-semibold text-orange-600 ">
                {restaurantInfo?.cuisines?.join(", ")}
              </p>

              <div className="flex gap-2 mt-2">
                <div className="w-[9px] flex flex-col justify-center items-center">
                  <div className="w-[7px] h-[7px] bg-gray-500 rounded-full"></div>
                  <div className="w-[1px] h-[25px] bg-gray-500 "></div>
                  <div className="w-[7px] h-[7px] bg-gray-500 rounded-full"></div>
                </div>
                <div className="flex flex-col gap-1 text-sm font-semibold">
                  <p>
                    Outlet{" "}
                    <span className="text-gray-500 font-normal">
                      {restaurantInfo.areaName}
                    </span>
                  </p>
                  <p>{restaurantInfo.sla?.slaString}</p>
                </div>
              </div>

              <div className=" w-full">
                <div className="flex items-center p-3">
                  {restaurantInfo.length !== 0 &&
                  restaurantInfo?.expectationNotifiers ? (
                    <>
                      <img
                        className="w-6"
                        src={
                          `${import.meta.env.VITE_MEDIA_URL}/fl_lossy,f_auto,q_auto,w_40,h_40/` +
                          restaurantInfo.feeDetails?.icon
                        }
                        alt=""
                      />
                        <hr/>
                      <span className="text-sm ml-4 text-gray-500 font-normal">
                        {restaurantInfo?.expectationNotifiers[0]?.enrichedText?.replace(
                          /<[^>]*>/g,
                          ""
                        )}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantInfo;
