import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import AddProductForm from './AddProductForm'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }
  render() {
    return (
      <div>
        <div>
          {this.props.products[0]
            ? this.props.products.map(product => {
                return (
                  <div key={product.id}>
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)

/**
 * PROP TYPES
 */
// AllProducts.propTypes = {
//     product: PropTypes.string
// }
