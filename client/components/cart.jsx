import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {CartList} from './cartList'

export class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart()
  }

  render() {
    let subtotal = 0
    return (
      <div>
        <h3>C A R T</h3>
        <CartList cartProps={this.props} />
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
