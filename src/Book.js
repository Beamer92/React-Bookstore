import React from 'react'
import {Button} from 'reactstrap'

export default function Book({title, author, pages, price, addToCart}){

  return (
    <tr>
      <td>{title}</td>
      <td>{author}</td>
      <td>{pages}</td>
      <td>{price ? price : 1}</td>
      <td><Button color='success' onClick={addToCart}>BUY!</Button></td>
    </tr>
  )
}