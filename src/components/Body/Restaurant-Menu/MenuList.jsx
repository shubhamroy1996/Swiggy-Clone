import React, { useState } from "react";
import DetailedMenu from "./DetailedMenu";

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
  return (
    <div className="my-5">
      {itemCards.map(({ card: { info } }) => (
        <DetailedMenu key={info.id} info={info} />
      ))}
    </div>
  );
}

export default MenuList;
