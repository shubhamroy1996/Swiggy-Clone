import React, { useState } from "react";


function MenuList({ card }) {
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
            <MenuList card={data} />
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
                  aggregatedRating: { rating, ratingCount, ratingCountV2 },
                },
              },
            },
          }) => {
            const [showMore, setShowMore] = useState(false);
  
            function displayDescription() {
              setShowMore(!showMore);
            }
  
            let trimDescription = description?.substring(0, 140) + "...";
  
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
                      <i
                        className={
                          "fi mt-1 text-[11px] fi-ss-star  text-green-600"
                        }
                      ></i>{" "}
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
                      className="bg-white absolute bottom-[20px] left-1/2 -translate-x-1/2 text-lg
                   text-green-600 font-bold rounded-xl border px-10 py-1 drop-shadow"
                    >
                      ADD
                    </button>
                    <p className="text-[13px] text-slate-500 mt-4 text-center">
                      Customisable
                    </p>
                  </div>
                </div>
                <hr className="border my-5" />
              </>
            );
          }
        )}
      </div>
    );
  }

export default MenuList;
