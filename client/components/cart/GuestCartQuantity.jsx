import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ls from 'local-storage'
import {quantityAlert} from '../../utils'

export class GuestCartQuantity extends React.Component {
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
    this.setState({
      quantity: this.props.product[1]
    })
  }

  handleUpdate(e) {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
    const updatedProduct = [this.props.product[0], this.state.quantity]
    let cart = ls.get('cart')
    cart.filter(prod => {
      if (prod[0].name === this.props.product[0].name) {
        prod[1] = this.state.quantity
      }
    })
    ls.set('cart', cart)
    console.log(cart)
  }

  handleChange(e) {
    // e.preventDefault()
    // this.setState({
    //   [e.target.name]: e.target.value
    // })
    // const {product, cart, deleteProduct} = this.props
    // quantityAlert(
    //   this.state.quantity,
    //   product.id,
    //   cart.id,
    //   product.name,
    //   deleteProduct
    // )
  }

  increment(e) {
    e.preventDefault()
    const quantity = this.state.quantity
    quantity < 20 &&
      this.setState({
        quantity: quantity + 1
      })
    // const {product, cart, deleteProduct} = this.props
    // //
    // // DOUBLE CHECK THAT THIS HELPER FUNCTION CAN BE USED HERE WITH DELETE
    // //
    // quantityAlert(quantity, product.id, cart.id, product.name, deleteProduct)
    // //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  }

  decrement(e) {
    e.preventDefault()
    const quantity = this.state.quantity
    quantity >= 1 &&
      this.setState({
        quantity: quantity - 1
      })
    // const { product } = this.props
  }

  clearAll(e) {
    // e.preventDefault()
    this.setState({
      quantity: 0
    })
    let cart = ls.get('cart')
    let updatedCart = cart.filter((pro, index) => {
      if (pro[0].name === this.props.product[0].name) {
        cart.slice(index, 1)
      }
    })
    if (updatedCart.length === 0) {
      ls.set('cart', [])
    } else {
      ls.set('cart', updatedCart)
    }
  }

  render() {
    // console.log('inside of cart quantity render', this.props)
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
          <button type="button" onClick={e => this.clearAll(e)}>
            Delete
          </button>
        </form>
      </div>
    )
  }
}

export default connect(null, null)(GuestCartQuantity)
