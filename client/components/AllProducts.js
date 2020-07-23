import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts, removeAProduct} from '../store/products'
import AddProductForm from './AddProductForm'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  handleRemove(productId) {
    this.props.removeProduct(productId)
  }

  render() {
    const {products} = this.props
    const isAdmin = this.props.user.isAdmin

    return (
      <div>
        <div className="main-img">
          <h2>Products</h2>
        </div>
        <div className="card-container">
          {this.props.products[0]
            ? products.map(product => {
                return (
                  <div key={product.id} className="card">
                    <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl} className="all-prod-img" />

                      <h4 className="all-product-container">{product.name}</h4>

                    <h4 className="product-price">{product.price}</h4>
                    </Link>
                    <button type="button" className="prodBtn">Add to Cart</button>
                    {isAdmin ? (
                      <button
                        className="button"
                        type="button"
                        onClick={() => this.handleRemove(product.id)}
                        width="100px"
                      >
                        <h4>remove</h4>
                      </button>
                    ) : null}
                  </div>
                )
              })
            : 'loading....'}
        </div>
        {isAdmin ? (
          <div>
            <AddProductForm props={this.props} />
          </div>
        ) : null}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(fetchProducts()),
    removeProduct: productId => dispatch(removeAProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
