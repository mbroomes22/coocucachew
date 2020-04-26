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

    ////////////////////////////////////////////////////
    // Working on adquiring props before render in order
    // to set the state before render///////////////////
    ////////////////////////////////////////////////////

    // this.handleChange = this.handleChange.bind(this)
    // this.increament = this.increament.bind(this)
    // this.decreament = this.decreament.bind(this)
  }

  // handleChange(e) {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  // componentDidMount() {
  //   console.log('inside cart list component did mount', this.props)
  //   // localStorage.cart = this.state.cart
  // }

  // increament = () => {
  //   this.setState({
  //     qty: this.state.qty + 1
  //   })
  // }

  // decreament = () => {
  //   this.setState({
  //     qty: this.state.qty - 1
  //   })
  // }

  render() {
    console.log('inside cart list render', this.props)
    return (
      <div>
        {this.props.cart.products
          ? this.props.cart.products.map(product => (
              <div key={product.id} className="cartProducts">
                <Link to={`/${product.id}`}>
                  <h4>{product.name}</h4>
                  <img src={product.imageUrl} width="50" />
                </Link>
                <button type="button" onClick={this.decreament}>
                  {' '}
                  -{' '}
                </button>
                <p>{product.orderProduct.quantity}</p>
                <button type="button" onClick={this.increament}>
                  {' '}
                  +{' '}
                </button>
                <p>{product.price}</p>
                <h3>Subtotal</h3>
              </div>
            ))
          : 'Loading, please wait while I fetch your cart...'}
      </div>
    )
  }
}

export default connect(null, null)(CartList)
