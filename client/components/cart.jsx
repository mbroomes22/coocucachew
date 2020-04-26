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
  async componentDidMount() {
    await this.props.getCart()
  }

  render() {
    return (
      <div>
        <h3>C A R T</h3>
        <CartList cart={this.props.cart} />
        {/* <userForm cart={this.props.cart} /> */}
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
