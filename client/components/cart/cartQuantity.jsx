import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ls from 'local-storage'
import updateCartDbProduct from '../../store/cartStore'
import deleteProductFromDbCart from '../../store/cartStore'

export class CartQuantity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  componentDidMount() {
    console.log('cart quantity component did mount', this.props.product)
    this.setState({
      quantity: this.props.product.orderProduct.quantity
    })
  }

  handleUpdate(e) {
    e.preventDefault()
    const updatedProduct = {
      ...this.props.product,
      orderProduct: {
        ...this.props.product.orderProduct,
        quantity: this.state.quantity
      }
    }

    ls.set(`${this.props.product.name}`, updatedProduct)

    const newPrice =
      ls.get('subtotal') +
      this.state.quantity * parseInt(this.props.product.price.substring(1), 10)

    ls.set('subtotal', newPrice)
    ls.set('total', newPrice + 6)
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  increment(e) {
    e.preventDefault()
    if (this.state.quantity < 20) {
      const quantity = this.state.quantity
      this.setState({
        quantity: quantity + 1
      })
    } else {
      alert(
        `Sorry, we don't have more than 20 ${
          this.props.product.name
        }s in stock :(`
      )
    }
  }
  decrement(e) {
    e.preventDefault()
    if (this.state.quantity > 0) {
      const quantity = this.state.quantity
      this.setState({
        quantity: quantity - 1
      })
    } else if (this.state.quantity > 0) {
      this.props.deleteProduct(this.props.product.id, this.props.cart.id)
    } else {
      alert(`Sorry, you can't purchase less than 0 ${this.props.product.name}`)
    }
  }
  render() {
    console.log('inside of cart quantity render', this.props)
    return (
      <div>
        <form onSubmit={e => this.handleUpdate(e)}>
          <button type="button" onClick={e => this.decrement(e)}>
            {' '}
            -{' '}
          </button>
          <input
            onChange={e => this.handleChange(e)}
            type="number"
            value={this.state.quantity}
            name="quantity"
          />
          <button type="button" onClick={e => this.increment(e)}>
            {' '}
            +{' '}
          </button>
          <button type="submit">Update</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  updateCartProduct: (productId, Qty) =>
    dispatch(updateCartDbProduct(productId, Qty)),
  deleteProduct: (productId, orderId) =>
    dispatch(deleteProductFromDbCart(productId, orderId))
})

export default connect(null, mapDispatch)(CartQuantity)
