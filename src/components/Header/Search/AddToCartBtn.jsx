import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../../utils/cartSlice'
import toast from 'react-hot-toast'

function AddToCartBtn({info,restaurantInfo,handleIsDiffRes}) {

    const cartData = useSelector((state)=> state.cartSlice.cartItems)
    const getRestaurantInfoFromLocale = useSelector((state)=> state.cartSlice.restaurantInfo)
    const dispatch = useDispatch()

    function handleAddToCart() {
        const isAdded = cartData.find((data)=> data.id === info.id)

        if(!isAdded) {
            if(getRestaurantInfoFromLocale.name === restaurantInfo.name || 
                getRestaurantInfoFromLocale.length === 0
            ) {
                dispatch(addToCart(info, restaurantInfo))
                toast.success("Added To Cart")
            }else {
                toast.error("You have different Restaurant Item")
                handleIsDiffRes()
            }
            
        }else {
            toast.error("Item Already Added")
        }
    }

  return (
    <div>
      <button
            onClick={handleAddToCart}
            className="bg-white absolute bottom-[5px] left-1/2 -translate-x-1/2 text-lg
                   text-green-600 font-bold rounded-xl border px-10 py-1 drop-shadow hover:bg-gray-200"
          >
            ADD
          </button>
    </div>
  )
}

export default AddToCartBtn
