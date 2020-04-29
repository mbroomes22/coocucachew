import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import ls from 'local-storage'
import GuestCartQuantity from './GuestCartQuantity'

export class GuestCart extends React.Component {
  render() {
    let cart = ls.get('cart')
    console.log(cart)
    return (
      <div>
        {cart !== null || (undefined && cart.length > 0)
          ? cart.map(product => (
              <div key={product[0].id}>
                <Link to={`/${product[0].id}`}>
                  <img src={product[0].imageUrl} width="50" />
                  <h4>{product[0].name}</h4>
                </Link>
                <GuestCartQuantity product={product} cart={cart} />
              </div>
            ))
          : 'There are no products in your cart yet...'}
      </div>
    )
  }
}

export default connect(null, null)(GuestCart)
