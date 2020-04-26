import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ls from 'local-storage'

export class CartList extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.increment = this.increment.bind(this)
    this.decreament = this.decreament.bind(this)
    this.setPropsToLocalStorage = this.setPropsToLocalStorage.bind(this)
  }

  componentDidMount() {}

  handleChange(e) {
    e.preventDefault()
  }

  increment(e) {}
  decreament() {}

  setPropsToLocalStorage() {
    let subtotal = 0
    if (this.props.cart.products) {
      ls.set('id', this.props.cart.id)
      ls.set('isPending', this.props.cart.isPending)
      ls.set('cartProducts', this.props.cart.products)
      this.props.cart.products.map(product => {
        ls.set(`${product.name}`, product)
        subtotal +=
          product.orderProduct.quantity *
          parseInt(product.price.substring(1), 10)
      })
      ls.set('subtotal', subtotal)
      ls.set('total', subtotal + 6)
    } else {
      ls.set('id', 0)
      ls.set('isPending', true)
      ls.set('cartProducts', [])
      ls.set('subtotal', 0)
      ls.set('total', 6)
    }
  }

  render() {
    this.setPropsToLocalStorage()
    const lsProducts = ls.get('cartProducts')
    return (
      <div>
        {lsProducts.map(product => (
          <div key={product.id} className="cartproducts">
            <Link to={`/${product.id}`}>
              <img src={product.imageUrl} width="50" />
              <h4>{product.name}</h4>
            </Link>
            <div>
              <button type="button" onClick={this.decreament}>
                {' '}
                -{' '}
              </button>
              <p>{product.orderProduct.quantity}</p>
              <button type="button" onClick={this.increament}>
                {' '}
                +{' '}
              </button>
            </div>
            <div>
              <p>{product.price}</p>
            </div>
          </div>
        ))}
        <div>
          <div>
            <h5>Subtotal: </h5>
            <h5>{ls.get('subtotal')}</h5>
          </div>
          <div>
            <h4>Total: </h4>
            <h4>{ls.get('total')}</h4>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, null)(CartList)
