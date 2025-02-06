import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { Link, Outlet } from "react-router-dom";
import { Coordinates, CartContext } from "../../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import {toggleSearchBar} from "../../utils/toggleSlice"

function Header() {
  //const { visible, setVisible } = useContext(Visibility);
  const { setcoordinate } = useContext(Coordinates);

  const cartValue = useSelector((state) => state.cartSlice.cartItems)

  const visible = useSelector((state) => state.toggleSlice.searchBarToggle) //accessing initial data from redux store using useSelector
  const dispatch = useDispatch()

  const [searchResult, setSearchResult] = useState([]);
  const [address, setAddress] = useState("");

  function handleVisibility() {
    //setVisible((prev) => !prev);
    dispatch(toggleSearchBar())
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
    handleVisibility();
    setcoordinate({
      latitude: result.data[0].geometry.location.lat,
      longitude: result.data[0].geometry.location.lng,
    });
    setAddress(result.data[0].formatted_address);
  }

  const navItems = [
    {
      id: 1,
      name: "Swiggy Corporate",
      icon: "fi fi-rr-shopping-bag",
      path: "/corporate"
    },
    {
      id: 2,
      name: "Search",
      icon: "fi fi-rr-search",
      path: "/search"
    },
    {
      id: 3,
      name: "Offers",
      icon: "fi fi-rr-badge-percent",
      path: "/offers"
    },
    {
      id: 4,
      name: "Help",
      icon: "fi fi-sr-life-ring",
      path: "/help"
    },
    {
      id: 5,
      name: "Sign In",
      icon: "fi fi-rr-user",
      path: "/signIn"
    },
    {
      id: 6,
      name: "Cart",
      icon: "fi-rr-shopping-cart-add",
      path: "/cart"
    },
  ];

  return (
    <>
      <div className="w-full">
        <div
          onClick={handleVisibility}
          className={
            "w-full bg-gray-900/50 z-30 h-full absolute " +
            (visible ? "visible " : " invisible")
          }
        ></div>
        <div
          className={
            " bg-white  w-full md:w-[562px] h-full p-5 z-40 absolute duration-500 " +
            (visible ? "left-0" : "-left-[100%]")
          }
        >
          <div className="flex flex-col gap-4 mt-3 pr-8 pl-32 lg-[50%] mr-6">
            <i className="fi fi-br-cross " onClick={handleVisibility}></i>
            <input
              type="text"
              placeholder="Search for area, street name.."
              className="border p-5 focus:outline-none focus:shadow-xl font-bold h-[50px] text-gray-300 "
              onChange={(e) => searchLocation(e.target.value)}
            />

            <div className="border p-5 ">
              <ul>
                {searchResult.map((data, index) => {
                  const isLast = index === searchResult.length - 1;
                  return (
                    <div className="my-5 cursor-pointer" key={index}>
                      <div className="flex gap-4">
                        <i className="fi mt-1 fi-rr-marker"></i>
                        <li
                          onClick={() => getLatitudeAndLongitude(data.place_id)}
                        >
                          {data.structured_formatting.main_text}
                          <p className="text-sm opacity-65">
                            {data.structured_formatting.secondary_text}
                          </p>
                          {!isLast && (
                            <p className="opacity-35">
                              ----------------------------------
                            </p>
                          )}
                        </li>
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full shadow-md z-20 h-20 flex justify-center items-center">
          <div className=" w-[80%] flex justify-between">
            <Logo
              handleVisibility={handleVisibility}
              address={address}
            />
            <div className="flex items-center gap-12">
              {navItems.map((item) => (
                <Link to={item.path}>
                <div key={item.id} className="flex items-center gap-2">
                  <i
                    className={"text-xl text-gray-600 mt-1 fi " + item.icon}
                  ></i>
                  <p className="text-base font-medium text-gray-600">
                    {item.name}
                  </p>
                  {item.name === "Cart" && <p>{cartValue?.length}</p>}
                </div>
                </Link>
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
