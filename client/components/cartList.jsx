import React from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'
import {Link} from 'react-router-dom'

const defaultCart = {
  id: 0,
  isPending: false,
  products: []
}

export class CartList extends React.Component {
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
    console.log(this.props)
    // localStorage.cart = this.state.cart
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
    return (
      <div>
        {/* {this.props.cart.products
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
        <h3>Subtotal</h3> */}
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(CartList)
