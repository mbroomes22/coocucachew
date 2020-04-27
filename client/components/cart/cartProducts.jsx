import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartQuantity from './cartQuantity'
import ls from 'local-storage'
// import SecureLS from 'secure-ls'
// const ls = new SecureLS()

export class CartProducts extends React.Component {
  render() {
    const lsProducts = ls.get('cartProducts')
    return (
      <div>
        {this.props.cart.products
          ? lsProducts.map(product => (
              <div key={product.id} className="cartproducts">
                <Link to={`/${product.id}`}>
                  <img src={product.imageUrl} width="50" />
                  <h4>{product.name}</h4>
                </Link>
                <CartQuantity product={product} />
                <div>
                  <p>{product.price}</p>
                </div>
              </div>
            ))
          : 'Loading... Please wait while I fetch your cart'}
      </div>
    )
  }
}

export default connect(null, null)(CartProducts)
