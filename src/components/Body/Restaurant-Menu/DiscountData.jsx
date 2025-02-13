import React, { useState } from "react";

function DiscountData({ discountData }) {
  const [value, setValue] = useState(0);

  function scrollLeftSide() {
    value <= 0 ? "" : setValue((prev) => prev - 31);
  }

  function scrollRightSide() {
    value >= 124 ? "" : setValue((prev) => prev + 31);
  }

  return (
    <>
      <div className="w-full overflow-hidden">
        <div className="flex justify-between mt-8">
          <h1 className="font-bold mt-4 text-[20px] ml-3">Deals for you</h1>

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

        <div style={{ translate: `-${value}%` }} className=" flex gap-4 mt-5">
          {discountData.map((data, i) => {
            return (
              <div
                key={i}
                className="flex gap-2  min-w-[328px] border p-3 h-[76px] rounded-2xl"
              >
                <img
                  src={`${import.meta.env.VITE_MEDIA_URL}/fl_lossy,f_auto,q_auto,w_96,h_96/${data?.info?.offerLogo}`}
                  alt=""
                />

                <div>
                  <h2 className="flex font-bold text-[18px] capitalize">
                    {(data?.info?.header).toLowerCase()}
                  </h2>
                  <p className="text-gray-400 flex font-bold text-[14px]">
                    {data?.info?.couponCode}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DiscountData;
