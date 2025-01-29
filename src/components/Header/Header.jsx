import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { Outlet } from "react-router-dom";
import { Coordinates, Visibility } from "../../context/contextApi";

function Header() {
  const { visible, setVisible } = useContext(Visibility);
  const { setcoordinate } = useContext(Coordinates);

  const [searchResult, setSearchResult] = useState([]);

  function handleVisibility() {
    setVisible((prev) => !prev);
  }

  async function searchLocation(value) {
    if (value === "") return;
    const data = await fetch(
      `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${value}`
    );
    const result = await data.json();
    setSearchResult(result.data);
  }

  async function getLatitudeAndLongitude(id) {
    if (id === "") return;

    const data = await fetch(
      `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`
    );
    const result = await data.json();

    setcoordinate({
      latitude: result.data[0].geometry.location.lat,
      longitude: result.data[0].geometry.location.lng,
    });
  }

  function handleSearchFunctionality() {
    setVisible((prev) => !prev);
  }
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
    <>
      <div className="w-full">
        <div
          onClick={handleVisibility}
          className={
            "w-full bg-black/50 z-30 h-full absolute " +
            (visible ? "visible " : " invisible")
          }
        ></div>
        <div
          className={
            " bg-white  w-full md:w-[40%] h-full p-5 z-40 absolute duration-500 " +
            (visible ? "left-0" : "-left-[100%]")
          }
        >
          <div className="flex flex-col gap-4 mt-3 w-full lg-[50%] mr-6">
            <i className="fi fi-br-cross " onClick={handleVisibility}></i>
            <input
              type="text"
              placeholder="Search for area, street name.."
              className="border p-5 focus:outline-none focus:shadow-lg font-bold text-gray-300 "
              onChange={(e) => searchLocation(e.target.value)}
            />

            <div>
              <ul>
                {searchResult.map((data, i) => (
                  <li
                    key={i}
                    onClick={() => getLatitudeAndLongitude(data.place_id)}
                  >
                    {data.structured_formatting.main_text}
                    <p>{data.structured_formatting.secondary_text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full shadow-md z-20 h-20 flex justify-center items-center">
          <div className=" w-[80%] flex justify-between">
            <Logo handleVisibility={handleSearchFunctionality} />

            <div className="flex items-center gap-12">
              {navItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <i
                    className={"text-xl text-gray-600 mt-1 fi " + item.icon}
                  ></i>
                  <p className="text-base font-medium text-gray-600">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Header;
