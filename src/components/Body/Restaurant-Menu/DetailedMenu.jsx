import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../../../utils/cartSlice";
import { toggleDifferentRestaurant } from "../../../utils/toggleSlice";
import toast from "react-hot-toast";

function DetailedMenu({ info, restaurantInfo }) {
  let veg =
    "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png";
  let nonVeg =
    "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png";

  const [showMore, setShowMore] = useState(false);

  const cartValue = useSelector((state) => state.cartSlice.cartItems);
  const isDifferentRestaurant = useSelector(
    (state) => state.toggleSlice.isDifferentRestaurant
  );
  let getRestaurantInfoFromLocale = useSelector(
    (state) => state.cartSlice.restaurantInfo
  );
  let dispatch = useDispatch();

  const {
    name,
    defaultPrice,
    finalPrice,
    price,
    imageId,
    description = "",
    itemAttribute: { vegClassifier },
    ratings: {
      aggregatedRating: { rating, ratingCountV2 },
    },
  } = info;

  let trimDescription = description?.substring(0, 140) + "...";

  function displayDescription() {
    setShowMore(!showMore);
  }

  function handleAddToCart() {
    const itemAdded = cartValue.find((data) => data.id === info.id);

    if (!itemAdded) {
      if (
        getRestaurantInfoFromLocale.name === restaurantInfo.name ||
        getRestaurantInfoFromLocale.length === 0
      ) {
        dispatch(addToCart({ info, restaurantInfo }));
        toast.success("item added to cart");
      } else {
        dispatch(toggleDifferentRestaurant());
        toast.error("Different restaurant Item");
      }
    } else {
      toast.error("Already added");
    }
  }

  function handleDifferentRestaurant() {
    dispatch(toggleDifferentRestaurant());
  }

  function handleClearCart() {
    dispatch(clearCart());
    handleDifferentRestaurant();
  }

  return (
    <>
      <div className="flex ml-3 w-[780px] h-[180px] justify-between">
        <div className="w-[552px] h-[182px]">
          <img
            className="w-4 rounded-sm"
            src={vegClassifier === "VEG" ? veg : nonVeg}
          />
          <h1 className="font-bold text-lg text-gray-600">{name}</h1>
          <p className="text-base font-bold text-gray-600">
            ₹{defaultPrice / 100 || finalPrice / 100 || price / 100}
          </p>
          <div className="flex items-center gap-1">
            <i className={"fi mt-1 text-[11px] fi-ss-star  text-green-600"}></i>{" "}
            <span>
              {rating}({ratingCountV2})
            </span>
          </div>

          {description?.length > 145 ? (
            <div>
              <span className="">
                {showMore ? description : trimDescription}
              </span>
              <button
                className="font-bold text-slate-600 text-base"
                onClick={displayDescription}
              >
                {showMore ? "" : "more"}
              </button>
            </div>
          ) : (
            <span>{description}</span>
          )}
        </div>
        <div className="relative h-full">
          <img
            className=" h-[144px] w-[156px] rounded-2xl  "
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
          />
          <button
            onClick={handleAddToCart}
            className="bg-white absolute bottom-[20px] left-1/2 -translate-x-1/2 text-lg
                   text-green-600 font-bold rounded-xl border px-10 py-1 drop-shadow hover:bg-gray-200"
          >
            ADD
          </button>
          <p className="text-[13px] text-slate-500 mt-4 text-center">
            Customisable
          </p>
        </div>
      </div>
      <hr className="border my-5" />
      {isDifferentRestaurant && (
        <div className="w-[520px] h-[204px] flex flex-col gap-2 left-[33%] p-8 border z-50 fixed bottom-10 bg-white">
          <h1 className="text-[#282c3f] font-bold text-[20px]">
            Items already in cart
          </h1>
          <p className="text-sm text-slate-600 font-semibold">
            Your cart contains items from other restaurant. Would you like to
            reset your cart for adding items from this restaurant?
          </p>
          <div className="flex justify-between gap-3 w-full uppercase">
            <button
              onClick={handleDifferentRestaurant}
              className="border-2 w-1/2 p-3 border-green-600 text-[#60b246] font-bold"
            >
              {" "}
              NO
            </button>
            <button
              onClick={handleClearCart}
              className="  w-1/2 p-3 bg-[#60b246] text-white font-bold"
            >
              YES, START AFRESH
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailedMenu;
