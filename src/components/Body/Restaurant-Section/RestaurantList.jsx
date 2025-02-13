import React from "react";
import { Link } from "react-router-dom";

function RestaurantList(info) {
  return (
    <>
      <Link to={`/restaurantMenu/${info?.link.split("/")?.at(-1)}`}>
        <div key={info.id} className="min-w-[273px] h-[182px] relative">
          <img
            className="w-full h-full rounded-2xl object-cover"
            src={`${import.meta.env.VITE_MEDIA_URL}/fl_lossy,f_auto,q_auto,w_288,h_360/${info?.cloudinaryImageId}`}
            alt=""
          />
          <div className="bg-gradient-to-t from-slate-900 from-1% to-transparent to-40% rounded-2xl w-full h-full absolute top-0"></div>
          <p className="font-ProximaNovaCond_Black absolute bottom-0 text-white text-xl ml-2 mb-1 font-bold">
            {info?.aggregatedDiscountInfoV3?.header +
              " " +
              info?.aggregatedDiscountInfoV3?.subHeader}
          </p>
        </div>

        <div className="mt-3 ml-2">
          <h2 className="text-lg font-semibold">{info?.name}</h2>
          <p className="flex items-center gap-1 text-lg font-semibold ">
            <i className="fi fi-ss-circle-star text-green-600 mt-1 "> </i>
            {info?.avgRating} .<span className="">{info?.sla?.slaString}</span>{" "}
          </p>
          <p className="text-black/60 text-base font-medium line-clamp-1">
            {info?.cuisines.join(", ")}
          </p>
          <p className="text-base text-black/60 font-medium">
            {info?.areaName}
          </p>
        </div>
      </Link>
    </>
  );
}

export default RestaurantList;
