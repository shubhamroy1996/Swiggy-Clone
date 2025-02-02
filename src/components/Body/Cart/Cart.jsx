import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../../../context/contextApi";

function Cart() {
  const { cartValue, setCartValue } = useContext(CartContext);

  function handleRemoveFromCart(i) {
    let newArr = [...cartValue]
    newArr.splice(i,1)
    setCartValue(newArr)
    localStorage.setItem("cartValue",  JSON.stringify(newArr))
  }

  return (
    <Link to={"/cart"}>
      <div className="w-full">
        <div className="w-[50%] mx-auto">
          {cartValue.map((data) => (
            <div className="flex justify-between my-2">
              <h2 className="w-[70%] text-xl">{data.name}</h2>
              <div>
              <img
                className=" h-[144px] w-[156px] rounded-2xl  "
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${data?.imageId}`}/>
              <button
                onClick={()=>handleRemoveFromCart(i)}
                className="bg-white absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-base text-red-500 font-bold rounded-xl border px-5 py-2 drop-shadow"
                >Remove
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default Cart;
