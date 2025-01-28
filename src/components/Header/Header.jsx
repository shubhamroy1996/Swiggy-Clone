import React, { useState } from "react";
import Logo from "./Logo";
import { Outlet } from "react-router-dom";

function Header() {

  const [isVisible, setIsVisible] = useState(false)
  const navItems = [
    {
      id: 1,
      name: "Swiggy Corporate",
      icon: "fi fi-rr-shopping-bag",
    },
    {
      id: 2,
      name: "Search",
      icon: "fi fi-rr-search",
    },
    {
      id: 3,
      name: "Offers",
      icon: "fi fi-rr-badge-percent",
    },
    {
      id: 4,
      name: "Help",
      icon: "fi fi-sr-life-ring",
    },
    {
      id: 5,
      name: "Sign In",
      icon: "fi fi-rr-user",
    },
    {
      id: 6,
      name: "Cart",
      icon: "fi-rr-shopping-cart-add",
    },
  ];

  function handleVisibility(){
    setIsVisible(prev => !prev)

  }

  return (
    <div className="relative w-full">

      <div className={"w-full bg-black/50 z-30 h-full absolute" + (visible ? 'visible' : "invisible")} >
        <div className={"bg-white w-[40%] h-full z-40 absolute duration-500" + (visible ? "left-0" : "-left-0")}>
          <p className="bg-black text-white p-5 w-[10%]" onClick={handleVisibility}></p>

        </div>

      </div>

      <div className="w-full shadow-md h-20 flex justify-center items-center">
        <div className=" w-[80%] flex justify-between">
          <Logo />

          <div className="flex items-center gap-12">
            {navItems.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <i className={"text-xl text-gray-600 mt-1 fi " + item.icon}></i>
                <p className="text-base font-medium text-gray-600">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Header;
