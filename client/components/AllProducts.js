import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const AllProducts = props => {
  const {products} = props
  console.log('all products component props', props)

  return (
    <div>
      {products.map(product => {
        // <div key={}>
        // </div>
      })}
      <h3 />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products
  }
}

export default connect(mapState)(Product)

/**
 * PROP TYPES
 */
AllProducts.propTypes = {
  //   product: PropTypes.string
}
