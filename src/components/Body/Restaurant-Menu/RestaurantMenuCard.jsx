import React, { useState } from "react";

function RestaurantMenuCard({ menuData }) {
  let veg =
    "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png";
  let nonVeg =
    "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png";

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
        {menuData.map(({ card: { card } }) => (
          <DetailedMenu card={card} />
        ))}
      </div>
    </>
  );
}

function DetailedMenu({ card }) {
  const [isOpen, setisOpen] = useState(true);

  function toggleDropDown() {
    setisOpen((prev) => !prev);
  }

  if (card.itemCards) {
    const { title, itemCards } = card;
    return (
      <>
        <div className="mt-5">
          <div className="flex justify-between">
            <h1 className="font-bold ml-2 text-lg">
              {title}({itemCards?.length})
            </h1>
            <i
              className={
                "fi text-2xl fi-rr-angle-small-" + (isOpen ? "up" : "down")
              }
              onClick={toggleDropDown}
            ></i>
          </div>
          {isOpen && <MenuSection itemCards={itemCards} />}
        </div>
        <hr className="border h-[16px] bg-gray-100 mt-4 mb-4" />
      </>
    );
  } else {
    const { title, categories } = card;
    return (
      <>
        <div className="mt-5">
          <div className="flex justify-between">
            <h1 className="font-bold ml-2 text-lg">
              {title}({categories?.length})
            </h1>
            <i
              className={
                "fi text-2xl fi-rr-angle-small-" + (isOpen ? "up" : "down")
              }
              onClick={toggleDropDown}
            ></i>
          </div>
          {categories.map((data) => (
            <DetailedMenu card={data} />
          ))}
        </div>
      </>
    );
  }
}

function MenuSection({ itemCards }) {
  let veg =
    "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png";
  let nonVeg =
    "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png";
  return (
    <div className="my-5">
      {itemCards.map(
        ({
          card: {
            info: {
              name,
              defaultPrice,
              finalPrice,
              price,
              imageId,
              description,
              itemAttribute: { vegClassifier },
              ratings: {
                aggregatedRating: { rating, rratingCount, ratingCountV2 },
              },
            },
          },
        }) => (
          <>
            <div className="flex ml-3 w-[780px] h-[202px] justify-between">
              <div className="w-[552px] h-[174px]">
                <img
                  className="w-4 rounded-sm"
                  src={vegClassifier === "VEG" ? veg : nonVeg}
                />
                <h1 className="font-bold text-lg text-gray-600">{name}</h1>
                <p className="text-base font-bold text-gray-600">
                  ₹{defaultPrice / 100 || finalPrice / 100 || price / 100}
                </p>
                <p>
                  {rating}({ratingCountV2})
                </p>
                <p className=" mt-2 line-clamp-2">{description}</p>
              </div>
              <div className="relative h-full">
                <img
                  className=" h-[144px] w-[156px] rounded-2xl  "
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                />
                <button className="bg-white absolute bottom-[-20px] left-1/2  -translate-x-1/2 text-lg text-green-700 font-bold rounded-xl border px-10 py-2 drop-shadow">
                  Add
                </button>
              </div>
            </div>
            <hr className="border my-5" />
          </>
        )
      )}
    </div>
  );
}

export default RestaurantMenuCard;
