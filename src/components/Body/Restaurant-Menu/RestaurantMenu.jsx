import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function RestaurantMenu() {
  const {id} = useParams()

 async function fetchMenu() {
  const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9566294&lng=77.70468230000002&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`) 
  const result = await data.json()
  console.log(result)

}

  useEffect(
    ()=> {
      fetchMenu()
    } , []
  )

  return (
    <div>
      <h1>RESTAURANT MENU LOADING</h1>
    </div>
  )
}

export default RestaurantMenu
