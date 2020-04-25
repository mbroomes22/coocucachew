import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

// const localCart = localStorage.cart
// const defaultState = { cart: localCart }

export class Cart extends React.Component {
  componentDidMount() {
    this.props.getCart()
    console.log('cart render props', this.props)
  }

  render() {
    console.log(this.props)
    return <div />
  }
}

const mapState = state => ({
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: () => dispatch(fetchCart())
})

export default connect(mapState, mapDispatch)(Cart)

// const dbCart = this.props.getProducts()
// this.props.getCart(this.props.user.userId)

// if (localCart[0]) {
//   this.setState({
//     cart : localCart
//   })
// } else {

// this.setState({
//   cart : dbCart
// })
// }
// console.log('local storage in render', localStorage)
// const dbCart = this.props.getCart(this.props.user.id)
// localStorage.setItem('state', defaultState)
// console.log('state in render', this.state)
