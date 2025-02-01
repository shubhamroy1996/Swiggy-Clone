import React, { useContext } from 'react'
import { Link } from "react-router-dom";

import { CartContext } from '../../../context/contextApi'

function Cart() {
    const {cartValue, setCartValue} = useContext(CartContext)
  return (
    <Link to={"/cart"}>
      <div>
        
        {cartValue}
      </div>
    </Link>
  )
}

export default Cart
