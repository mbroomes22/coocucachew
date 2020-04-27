import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import SecureLS from 'secure-ls'
import ls from 'local-storage'
import {updateOrder} from '../store/cartStore'
// const ls = new SecureLS()
import CartQuantity from './CartQuantity'
import userForm from './Checkout/userForm'

export class CartList extends React.Component {
  constructor(props) {
    super(props)
    this.setPropsToLocalStorage = this.setPropsToLocalStorage.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  setPropsToLocalStorage() {
    let subtotal = 0

    if (this.props.cart.products && ls.get('isPending') === true) {
      ls.set('id', this.props.cart.id)
      ls.set('isPending', this.props.cart.isPending)
      ls.set('cartProducts', this.props.cart.products)

      this.props.cart.products.map(product => {
        ls.set(`${product.name}`, product)
        subtotal +=
          product.orderProduct.quantity *
          parseInt(product.price.substring(1), 10)
      })

      ls.set('subtotal', subtotal)
      ls.set('total', subtotal + 6)
    } else {
      ls.set('id', 0)
      ls.set('isPending', true)
      ls.set('cartProducts', [])
      ls.set('subtotal', 0)
      ls.set('total', 6)
    }
  }

  handleUpdate(e) {
    e.preventDefault()
    const cartForDb = ls.get('localStorage')
    this.props.updateDbCart(cartForDb, ls.get('id'))
    console.log('handle update works')
  }

  handleCheckout(e) {
    e.preventDefault()
    const cartForDb = ls.get('localStorage')
    this.props.updateDbCart(cartForDb, ls.get('id'))
    ls.set('isPending', false)
    console.log('handle checkout works')
  }

  render() {
    this.setPropsToLocalStorage()
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
        {this.props.cart.products ? (
          <div>
            <div>
              <h5>Subtotal: </h5>
              <h5>{ls.get('subtotal')}</h5>
            </div>
            <div>
              <h4>Total: </h4>
              <h4>{ls.get('total')}</h4>
              <button type="submit" onSubmit={e => this.handleUpdate(e)}>
                U P D A T E
              </button>
              <button type="submit" onSubmit={e => this.handleCheckout(e)}>
                C H E C K O U T
              </button>
              <button type="submit" onSubmit={e => this.handleUpdate(e)}>
                S A V E F O R L A T E R
              </button>
            </div>
          </div>
        ) : (
          'Loading your total...'
        )}
        <div>
          {!ls.get('isPending') ? (
            <userForm cart={this.props.cart} />
          ) : (
            'Redirecting'
          )}
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  updateDbCart: (order, orderId) => dispatch(updateOrder(order, orderId))
})

export default connect(null, mapDispatch)(CartList)
