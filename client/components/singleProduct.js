import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAProduct} from '../store/products'

export class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      qty: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // console.log('^*^*^', this.props)
    // this.props.match.params.productId ? (
    this.props.getProduct(this.props.match.params.productId)
    // : ('loading')
  }

  handleSubmit(event) {
    console.log('^^^^^^', event.target.value)
    event.preventDefault()
    return this.setState({
      name: this.props.singleProduct.name,
      price: this.props.singleProduct.price,
      qty: event.target.name
    })
  }

  render() {
    console.log('THIS STATE: ', this.state)
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
          <div className="quantity_input">
            <form onSubmit={event => this.handleSubmit(event)}>
              <select id="qty">
                <option defaultValue="">Qty</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <button type="submit">add to cart</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: productId => dispatch(getAProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
