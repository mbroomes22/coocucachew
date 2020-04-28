import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ls from 'local-storage'

export class CartQuantity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.product.orderProduct.quantity
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
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
    if (this.state.quantity !== 0) {
      const quantity = this.state.quantity
      this.setState({
        quantity: quantity - 1
      })
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

export default connect(null, null)(CartQuantity)
