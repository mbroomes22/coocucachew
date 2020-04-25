import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts, removeAProduct} from '../store/products'
// import {fetchCart} from '../store/cart'
import AddProductForm from './AddProductForm'
// import {Cart} from './Cart'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
    this.props.getCart(this.props.user.id)
  }

  handleRemove(productId) {
    this.props.removeProduct(productId)
  }

  render() {
    const {products} = this.props
    return (
      <div>
        <div>
          {this.props.products[0]
            ? products.map(product => {
                return (
                  <div key={product.id}>
                    <button
                      className="button"
                      type="button"
                      onClick={() => this.handleRemove(product.id)}
                      width="100px"
                    >
                      <h1>X</h1>
                      <h5>delete</h5>
                    </button>
                    <Link to={`/${product.id}`}>
                      <h4>{product.name}</h4>
                    </Link>
                    <h4>{product.price}</h4>
                    <img src={product.imageUrl} width="200" />
                    <p>{product.description}</p>
                  </div>
                )
              })
            : 'loading....'}
        </div>
        <div>
          <AddProductForm props={this.props} />
          <Cart props={this.props} />
          {/* user={this.props.user} */}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products,
    user: state.user
    // cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(fetchProducts()),
    removeProduct: productId => dispatch(removeAProduct(productId))
    // getCart: userId => dispatch(fetchCart(userId))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
