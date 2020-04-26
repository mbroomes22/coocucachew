// confirmation page confirming address, payment info, and cart items/cart total
//needs to be passed props from '../cart', bc props should access name, price, qty of items in cart and confirm a calculated total
//clicking 'Confirm&Checkout' button should send user's address, cart, and payment to db
import React, {Component} from 'react'
import {updateOrderHistory, updateUserAddresses} from '../../store/saveOrder'
import {connect} from 'react-redux'

export class ConfirmOrder extends Component {
  continue = evt => {
    evt.preventDefault()
    //Process form -send data to DB
    this.props.nextStep()
  }

  goBack = evt => {
    evt.preventDefault()
    this.props.prevStep()
  }

  handleSubmit = evt => {
    evt.preventDefault()
    this.props.addOrder(this.props.userId, this.props.total)
    this.props.addAddress(this.state.streetAddress)
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      streetAddress: '',
      zipCode: '',
      state: ''
    })
  }

  render() {
    const {
      values: {firstName, lastName, email, streetAddress, zipCode, state}
    } = this.props
    return (
      <div>
        <br />
        <button type="submit" onClick={this.goBack} className="button">
          Return to Payment Details
        </button>
        <h1 className="header">Confirm Order Details</h1>
        <br />
        <h2>Shipping Address</h2>
        <ul>
          <ol>
            <h3>First Name:</h3> <br /> {firstName}
          </ol>
          <ol>
            <h3>Last Name:</h3> <br /> {lastName}
          </ol>
          <ol>
            <h3>Email:</h3> <br /> {email}
          </ol>
          <ol>
            <h3>Street Address:</h3> <br /> {streetAddress}
          </ol>
          <ol>
            <h3>ZIP code:</h3> <br /> {zipCode}
          </ol>
          <ol>
            <h3>State:</h3> <br /> {state}
          </ol>
        </ul>
        <h2>Payment Method</h2>
        <ul>
          <ol>
            <p>Stripe</p>
          </ol>
        </ul>
        <br />
        <h2>Review Items</h2>
        <br />
        <br />
        <ul>
          {this.props.cartItems.map(item => (
            <div key={item.id}>
              <ol>
                <h3>{item.name}</h3> <br />
              </ol>
              <ol>
                <h3>{item.description}</h3> <br />
              </ol>
              <ol>
                <h3>{item.qty}</h3> <br />
              </ol>
              <ol>
                <h3>{item.price}</h3> <br />
              </ol>
            </div>
          ))}
        </ul>
        <h2>Order Total</h2>
        <br />
        {this.props.total}

        <button
          type="submit"
          onClick={this.continue}
          onSubmit={this.handleSubmit}
          className="button"
        >
          Confirm & Checkout
        </button>
      </div>
    )
  }
}

const mapState = state => {
  console.log('confirmation order State=>', state)
}

const mapDispatch = dispatch => ({
  addOrder: newOrder => dispatch(updateOrderHistory(newOrder)),
  addAddress: newAddress => dispatch(updateUserAddresses(newAddress))
})

export default connect(mapState, mapDispatch)(ConfirmOrder)
