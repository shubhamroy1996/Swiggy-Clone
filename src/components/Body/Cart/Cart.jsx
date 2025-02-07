import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteFromCart } from "../../../utils/cartSlice";
import toast from "react-hot-toast";

function Cart() {

  const cartValue = useSelector((state) => state.cartSlice.cartItems)
  const dispatch = useDispatch()

  function handleRemoveFromCart(i) {
    if(cartValue.length > 1) {
      let newArray = [...cartValue]
      newArray.splice(i,1)
    dispatch(deleteFromCart(newArray))
    toast.success("Item Removed from Cart")
    }
    else {
      handleClearCart()
      toast.success('cart is cleared!!!')
    }
  }

  function handleClearCart() {
    dispatch(clearCart())
  }

  // let totalPrice = 0
  // for(let i=0; i <cartValue.length;i++) {
  //    totalPrice = totalPrice + cartValue[i].price / 100 || cartValue[i].finalPrice / 100
  // }

  let totalPrice = cartValue.reduce((acc,curVal)=> acc + curVal.price / 100 || curVal.defaultPrice/100, 0)

  if (cartValue.length === 0) {
    return (
        <div className="w-full">
            <div className="w-[50%]  mx-auto">
                <h1>kuch order krle bhai bhuka marega kya....</h1>
                <Link to="/" className="bg-green-500 p-2 inline-block my-3">
                    Yaha se krle bhai order
                </Link>
            </div>
        </div>
    );
  }
  
 

  return (
    <Link to={"/cart"}>
      <div className="w-full">
        <div className="w-[50%] mx-auto">
          {cartValue.map((data, i) => (
            <div  key={i} className="flex justify-between my-5 p-2 w-full">
              {/* <h2 className="w-[70%] text-xl">{data.name}</h2> */}
              <h1 className="font-bold text-lg text-gray-600">{data.name}</h1>
              <p className="text-base font-bold text-gray-600">
                ₹{data.defaultPrice / 100 || data.finalPrice / 100 || data.price / 100}
             </p>
              <div className="relative h-full">
              <img
                className=" h-[140px] w-[156px] rounded-2xl  "
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${data?.imageId}`}/>
              <button
                onClick={()=>handleRemoveFromCart(i)}
                className="bg-white absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-base text-red-500 font-bold rounded-xl border px-5 py-2 drop-shadow"
                >Remove
              </button>
              </div>
            </div>
          ))}
          <h1 className="font-bold text-lg text-gray-600 mt-3">Total Price : ₹{totalPrice}</h1>
          <button onClick={handleClearCart} className="bg-green-600">
            Clear Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

export default Cart;
