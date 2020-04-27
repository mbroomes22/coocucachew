import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import SecureLS from 'secure-ls'
import ls from 'local-storage'
// import { totalFromStringAndNum } from '../../utils/handlestringPricing'
// import {updateCartinDb} from '../store/cartStore'
// const ls = new SecureLS()

const totalFromStringAndNum = (num, str) => {
  return num + parseInt(str.substring(1), 10)
}

const defaultState = {
  id: 0,
  total: 6,
  subtotal: 0,
  cartProducts: [],
  product: {}
}

export class CartList extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState

    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.increment = this.increment.bind(this)
    // this.decrement = this.decrement.bind(this)
    this.setPropsToLocalStorage = this.setPropsToLocalStorage.bind(this)
  }

  handleChange(e, source) {
    e.preventDefault()
  }

  handleUpdate(e) {
    console.log([e.target.name])
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // increment(e, source) {
  //   let productToIncrement = ls.get(`${source}`)
  //   if(productToIncrement.orderProduct.quantity < 20){
  //     productToIncrement.orderProduct.quantity += 1
  //     ls.set(`${source}`, productToIncrement)
  //     console.log(` total inside increment` ,ls.get('total'))
  //     const newPrice = totalFromStringAndNum( ls.get('subtotal'), productToIncrement.price )
  //     ls.set('subtotal', newPrice)
  //     ls.set('total', newPrice + 6)
  //     this.setState({subtotal:newPrice, total:(newPrice+6), [source] : productToIncrement})
  //   } else {
  //     alert(`Sorry, we don't have move than 50 ${source}s in stock :(`)
  //   }
  // }

  // decrement(e, source) {
  //   e.preventDefault()
  //   let productToDecrement = ls.get(`${source}`)
  //   if(productToDecrement.orderProduct.quantity !== 0){
  //     productToDecrement.orderProduct.quantity --
  //     ls.set(`${source}`, productToDecrement)
  //     const newPrice = totalFromStringAndNum( ls.get('subtotal'), productToDecrement.price )
  //     ls.set('subtotal', newPrice)
  //     ls.set('total', newPrice + 6)
  //     this.setState({subtotal:newPrice, total:(newPrice + 6), [source] : productToDecrement})
  //   } else {
  //     alert("You can't purchase less than 0 products")
  //   }
  // }

  setPropsToLocalStorage() {
    let subtotal = 0
    if (this.props.cart.products && ls.get('isPending') === true) {
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

  componentWillUnmount() {
    // const updateCartInfo = {
    //   id : ls.get('id'),
    //   isPending : ls.get('isPending'),
    //   products : () => {
    //     ls.get
    //   },
    //   subTotal : ls.get('subtotal'),
    //   total : ls.get('total')
    // }
    // updateDbCart()
  }

  render() {
    this.setPropsToLocalStorage()
    // console.log('cartlist render cartproducts in local storage:', ls.get('cartProducts'))
    const lsProducts = ls.get('cartProducts')

    return (
      <div>
        {this.props.cart.products
          ? lsProducts.map(product => (
              <div key={product.id} className="cartproducts">
                <Link to={`/${product.id}`}>
                  <img src={product.imageUrl} width="50" />
                  <h4>{product.name}</h4>
                </Link>
                <div>
                  <form onSubmit={e => this.handleUpdate(e)}>
                    <button
                      type="button"
                      onClick={e => this.decrement(e, product.name)}
                    >
                      {' '}
                      -{' '}
                    </button>
                    <input
                      onChange={e => this.handleChange(e)}
                      type="number"
                      value={
                        this.state.cartProducts[product].orderProduct.quantity
                      }
                      name="quantity"
                    />
                    <p>{product.orderProduct.quantity}</p>
                    <button
                      type="button"
                      onClick={e => this.increment(e, product.name)}
                    >
                      {' '}
                      +{' '}
                    </button>
                  </form>
                </div>
                <div>
                  <p>{product.price}</p>
                </div>
              </div>
            ))
          : 'Loading... Please wait while I fetch your cart'}
        {this.props.cart.products ? (
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
        ) : (
          'Loading your total...'
        )}
      </div>
    )
  }
}

// const mapDispatch = dispatch => ({
//   updateDbCart : () => dispatch(updateCartinDb())
// })

export default connect(null, null)(CartList)
