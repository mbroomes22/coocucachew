import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

const localCart = localStorage.cart
const defaultState = {}

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    const dbCart = this.props.cart
    if (!localCart[0]) {
      this.props.getCart()
      this.setState(dbCart)
    }
    this.setState(localCart)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h3>C A R T</h3>
        {this.state.map(order => (
          <div key={order.id}>
            <p />
          </div>
        ))}
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
