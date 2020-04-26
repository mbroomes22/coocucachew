import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {Link} from 'react-router-dom'

const localCart = localStorage.cart

const defaultCart = {
  id: 0,
  isPending: false,
  products: []
}
export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: {
        id: 0,
        isPending: false,
        products: []
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    if (localCart !== undefined) {
      this.setState({cart: localCart})
    } else {
      this.props.getCart()
    }
  }

  // Increament = () => {
  //   this.setState({
  //     qty: this.state.qty + 1
  //   })
  // }

  // Decreament = () => {
  //   this.setState({
  //     qty: this.state.qty - 1
  //   })
  // }

  render() {
    let subtotal = 0
    return (
      <div>
        <h3>C A R T</h3>
        {this.props.cart.products
          ? this.props.cart.products.map(product => (
              <div key={product.id}>
                <Link to={`/${product.id}`}>
                  <h4>{product.name}</h4>
                </Link>
                <button type="button" onClick={this.Decreament}>
                  {' '}
                  -{' '}
                </button>
                <p>{product.orderProduct.quantity}</p>
                <button type="button" onClick={this.Increament}>
                  {' '}
                  +{' '}
                </button>
                <p>{product.price}</p>
              </div>
            ))
          : 'Loading, please wait while I fetch your cart...'}
        <h3>Subtotal</h3>
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

// const productQuantity = this.state.cart.products.filter(product => {
//   const printed = new Map()
//   if (printed[product]) {
//     printed[product] ++
//   } else {
//     printed[product] = 1
//   }
//   return printed
// })
// console.log('whichcart() productquantity', productQuantity)
