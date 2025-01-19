import React from "react";
import Logo from "./Logo";

function Header() {
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

  return (
    <div className="w-full shadow-md h-20 flex justify-center items-center">
      <div className=" w-[80%] flex justify-between">
        <Logo />

        <div className="flex items-center gap-12">
          {navItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <i className={"text-xl text-gray-600 mt-1 fi " + item.icon}></i>
              <p className="text-base font-medium text-gray-600">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
