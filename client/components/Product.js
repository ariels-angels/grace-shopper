import React from 'react'
import {Link} from 'react-router-dom'

export default function Product(props) {
  return (
    <div>
      <Link to={`/products/${props.id}`}>
        <img src={props.imageUrl} />
        <h3>{props.title}</h3>
        <h4>{props.price}</h4>
      </Link>
    </div>
  )
}
