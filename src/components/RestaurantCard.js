import React from 'react'
import { CDN_URL } from '../utils/constants';

function RestaurantCard(props) {
    const {
        respList:{info}
    } = props
  return (
    <div className='m-4 p-4 h-[30rem] w-[250px] bg-gray-100 rounded-lg hover:bg-gray-200'>
        <img className='rounded-lg h-[200px] w-[218px]' alt='log-img' src={CDN_URL + info.cloudinaryImageId}/>
        <h3 className='font-bold py-4 text-lg'>{info.name}</h3>
        <div className='flex flex-wrap flex-col content-start gap-1'>
        <h4>{info.cuisines.join(", ")}</h4>
        <h4>{info.avgRating} starts</h4>
        <h4>{info.costForTwo} </h4>
        <h4>{info.sla.deliveryTime} minitus</h4>
        </div>
    </div>
  )
}

// Higher Order Component

// input - RestaurantCard => RestraucardPromoted

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
     return(
      <div>
        <label className='absolute bg-black text-white m-2 p-2 rounded-lg'>Promoted</label>
        <RestaurantCard {...props}/>
      </div>
     )
  }
}

export default RestaurantCard;