import React from "react";
import { Link } from "react-router-dom";

function Logo({ handleVisibility, address }) {
  return (
    <>
      <Link to={"/"}>
        <div className="flex items-center space-x-7">
          <img
            className="w-12"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_800,h_800/portal/m/logo_192x192.png"
          />
          <div className="flex items-center gap-3" onClick={handleVisibility}>
            <p className="flex hover:text-orange-600 text-ellipsis font-bold underline underline-offset-4">
              Other
            <span className=" ml-2 max-w-[200px] text-sm opacity-85 line-clamp-1">
              {address}
            </span>
            </p>

            <i className="fi text-2xl mt-2 fi-rs-angle-small-down"></i>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Logo;
