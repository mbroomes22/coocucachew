import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateOrder} from '../../store/cartStore'
import ls from 'local-storage'
// import SecureLS from 'secure-ls'
// const ls = new SecureLS()

export class CartCheckout extends React.Component {
  constructor(props) {
    super(props)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  //update the cart
  handleUpdate(e) {
    e.preventDefault()
    const cartForDb = ls.get('localStorage')
    this.props.updateDbCart(cartForDb, ls.get('id'))
    console.log('handle update works')
  }

  //begin checkout cart
  handleCheckout(e) {
    e.preventDefault()
    const cartForDb = ls.get('localStorage')
    this.props.updateDbCart(cartForDb, ls.get('id'))
    ls.set('isPending', false)
    console.log('handle checkout works')
  }

  nextStep = () => {
    const {step} = this.state
    this.setState({
      step: step + 1
    })
  }

  //go back to previous step
  prevStep = () => {
    const {step} = this.state
    this.setState({
      step: step - 1
    })
  }

  render() {
    return (
      <div>
        {this.props.cart.products ? (
          <div>
            <div>
              <h5>Subtotal: </h5>
              <h5>{ls.get('subtotal')}</h5>
            </div>
            <div>
              <h4>Total: </h4>
              <h4>{ls.get('total')}</h4>
              <button type="submit" onSubmit={e => this.handleUpdate(e)}>
                U P D A T E
              </button>
              <button type="submit" onSubmit={e => this.handleCheckout(e)}>
                C H E C K O U T
              </button>
              <button type="submit" onSubmit={e => this.handleUpdate(e)}>
                S A V E F O R L A T E R
              </button>
            </div>
          </div>
        ) : (
          'Loading your total...'
        )}
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  updateDbCart: (order, orderId) => dispatch(updateOrder(order, orderId))
})

export default connect(null, mapDispatch)(CartCheckout)
