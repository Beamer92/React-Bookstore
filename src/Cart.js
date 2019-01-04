import React from 'react'

export default function Cart(props){
  return(
    <div className='cartRow row'>
      <div>&bull; {props.title.substr(0,15)}... x{props.qty} = &#36;{props.qty * props.price}</div>
      <a onClick={props.removeFromCart} href="#">&nbsp; del</a>
    </div>
  )
}