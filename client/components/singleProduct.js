import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAProduct} from '../store/products'
import {addToCart} from '../store/cart'
import ls from 'local-storage'
//need import

export class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      qty: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.productId)
  }

  async handleClick(product) {
    const orderproduct = this.props.singleProduct
    const userId = this.props.user.id
    await this.props.addToCart(userId, orderproduct)
    let updatedProduct = {
      [this.state.name]: this.props.singleProduct
    }

    const cartProducts = ls.get('cart')

    if (cartProducts !== null || (undefined && cartProducts.length > 1)) {
      const cart = Array.from(cartProducts)
      cart.filter(prod => {
        if (prod[0].name === this.props.singleProduct.name) {
          prod[1] += 1
        }
        if (
          prod === cart[cart.length - 1] &&
          prod[0].name !== this.props.singleProduct.name
        )
          cart.push([this.props.singleProduct, 1])
      })
      ls.set('cart', cart)
      // console.log('IF STATEMENT',cart)
    } else {
      let cart = []
      cart[0] = [this.props.singleProduct, 1]
      ls.set('cart', cart)
      // console.log('ELSE STATEMENT',cart)
    }
    alert('Added to cart')
  }

  render() {
    const singleProduct = this.props.singleProduct
    return (
      <div className="singleProduct_page">
        <div className="header" key={singleProduct.id}>
          <h3>{singleProduct.name}</h3>
        </div>
        <div className="singleProduct_container">
          <div className="singleProduct_image">
            <img src={singleProduct.imageUrl} width="200" />
          </div>
          <div className="singleProduct_description">
            <p>{singleProduct.description}</p>
          </div>
          <div className="singleProduct_price">
            <p>{singleProduct.price}</p>
          </div>
        </div>
        <div className="quantity_change">
          <button
            className="addToCart_button"
            type="submit"
            onClick={e => {
              this.handleClick(e)
            }}
          >
            add to cart
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.products,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: productId => dispatch(getAProduct(productId)),
    addToCart: (userId, orderProduct) =>
      dispatch(addToCart(userId, orderProduct))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
