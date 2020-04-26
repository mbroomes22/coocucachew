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
      cart: [
        {
          // id: 0,
          // isPending: false,
          // products: [],
          name: 'Snicker Doodle',
          imageUrl:
            'https://www.foxandbriar.com/wp-content/uploads/2019/09/Snickerdoodles-12-of-12.jpg',
          price: 2.0,
          qty: 1
        }
      ]
    }
    this.handleChange = this.handleChange.bind(this)
    console.log('I AM CART COMPONENTs PROPS:', this.props)
    console.log('I AM CART COMPONENTs STATES:', this.state)
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

  Increament = () => {
    this.setState({
      qty: this.state.qty + 1
    })
  }

  Decreament = () => {
    this.setState({
      qty: this.state.qty - 1
    })
  }

  render() {
    let subtotal = 0
    return (
      <div>
        <h3>C A R T</h3>

        {this.state.cart
          ? this.state.cart.map(product => (
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
