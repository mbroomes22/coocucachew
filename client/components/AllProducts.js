import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
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
    return (
      <div>
        <div>
          {this.props.products[0]
            ? this.props.products.map(product => {
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
                    <h4>{product.name}</h4>
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
        </div>
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
