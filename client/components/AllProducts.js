import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts, removeAProduct} from '../store/products'
import AddProductForm from './addProductForm'

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
    console.log(isAdmin)

    return (
      <div>
        <div className="card-container">
          {this.props.products[0]
            ? products.map(product => {
                return (
                  <div key={product.id} className="card">
                    <Link to={`/products/${product.id}`}>
                      <h4>{product.name}</h4>
                    </Link>
                    <h4>{product.price}</h4>
                    <img src={product.imageUrl} width="200" />
                    <p>{product.description}</p>
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
