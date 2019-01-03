import React from 'react'

export default function Cart(props){
  return(
    <div className='cartRow row'>
      <div>&bull; {props.title.substr(0,15)}... &#36;{props.price}</div>
    </div>
  )
}