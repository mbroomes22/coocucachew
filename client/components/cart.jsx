import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {CartList} from './cartList'
import UserForm from './Checkout/userForm'

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
        {/* </button> */}
        <CartList cart={this.props.cart} />
        <UserForm cart={this.props.cart} />
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
