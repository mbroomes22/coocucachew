import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {CartList} from './cartList'
// import {userForm} from './Checkout/userForm'

const defaultCart = {
  id: 0,
  isPending: false,
  products: []
}
export class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart()
    console.log(this.props)
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    let subtotal = 0
    console.log(this.props)
    return (
      <div>
        {/* <button type="button" onSubmit={e => this.handleSubmit(e)}> */}
        <h3>C A R T</h3>
        {/* {this.state.cart
          ? this.state.cart.map((product) => (
              <div key={product.id}>
                <Link to={`/${product.id}`}>
                  <h4>{product.name}</h4>
                </Link>
                <button type="button" onClick={this.Decreament}>
                  {' '}
                  -{' '}
                </button>
                <p>{product.qty}</p>
                <button type="button" onClick={this.Increament}>
                  {' '}
                  +{' '}
                </button>
                <p>{product.price}</p>
              </div>
            ))
          : 'Loading, please wait while I fetch your cart...'}
        <h3>Subtotal</h3>
        {/* </button> */}
        {/* <CartList cart={this.props.cart} />
        <userForm cart={this.props.cart} /> */}{' '}
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(Cart)
