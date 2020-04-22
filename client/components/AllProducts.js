import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

/**
 * COMPONENT
 */

export class AllProducts extends React.Component {
  componentDidMount() {
    console.log('PROPSSHY=>', this.props)
    this.props.getAllProducts()
  }

  render() {
    console.log('PROPSSHY=>', this.props)
    // console.log(product)
    return (
      <div>
        {this.props.products.map(product => {
          return (
            <div key={product.id}>
              <h4>{product.name}</h4>
              <img src={product.imageUrl} />
              <p>{product.description}</p>
            </div>
          )
        })}
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
