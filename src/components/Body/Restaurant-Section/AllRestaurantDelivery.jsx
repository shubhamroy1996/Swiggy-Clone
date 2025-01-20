import React from 'react'

function AllRestaurantDelivery({data}) {
  return (
    <>
      <div className="flex justify-between mt-5 rounded-lg">
      <h2 className="text-2xl font-bold ">
      Restaurants with online food delivery in Bangalore
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 mt-4">
      {data.map((item) => (
          <div className="hover:scale-95 duration-200">
            <div key={item.id} className="min-w-[273px] h-[182px] relative">
              <img
                className="w-full h-full rounded-2xl object-cover"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.info.cloudinaryImageId}`}
                alt=""
              />
              <div className="bg-gradient-to-t from-slate-900 from-1% to-transparent to-40% rounded-2xl w-full h-full absolute top-0"></div>
              <p className="font-ProximaNovaCond_Black absolute bottom-0 text-white text-xl ml-2 mb-1 font-bold">
                {item.info.aggregatedDiscountInfoV3?.header +
                  " " +
                  item.info.aggregatedDiscountInfoV3?.subHeader}
              </p>
            </div>

            <div className="mt-3 ml-2">
              <h2 className="text-lg font-semibold">{item.info.name}</h2>
              <p className="flex items-center gap-1 text-lg font-semibold ">
                <i className="fi fi-ss-circle-star text-green-600 mt-1 "> </i>
                {item.info.avgRating} .
                <span className="">{item.info.sla?.slaString}</span>{" "}
              </p>
              <p className="text-black/60 text-base font-medium line-clamp-1">
                {item.info.cuisines.join(",")}
              </p>
              <p className="text-base text-black/60 font-medium">
                {item.info.areaName}
              </p>
            </div>
          </div>
        ))}
      
      </div>
    </>
  )
}

export default AllRestaurantDelivery
