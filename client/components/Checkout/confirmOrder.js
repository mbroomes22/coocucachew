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
      country: ''
    })
  }

  render() {
    const {
      values: {firstName, lastName, email, streetAddress, zipCode, country}
    } = this.props
    return (
      <div>
        <button type="submit" onClick={this.goBack}>
          Return to Payment Details
        </button>
        <h1>Confirm Order Details</h1>
        <br />
        <br />
        <h2>Shipping Address</h2>
        <br />
        <br />
        <ul>
          <li>
            <h3>First Name:</h3> <br /> {firstName}
          </li>
          <li>
            <h3>Last Name:</h3> <br /> {lastName}
          </li>
          <li>
            <h3>Email:</h3> <br /> {email}
          </li>
          <li>
            <h3>Street Address:</h3> <br /> {streetAddress}
          </li>
          <li>
            <h3>Zipcode:</h3> <br /> {zipCode}
          </li>
          <li>
            <h3>Country:</h3> <br /> {country}
          </li>
        </ul>
        <h2>Payment Method</h2>
        <br />
        <br />
        <ul>
          <li>
            <h3>Payment:</h3> <br /> <p>Stripe</p>
          </li>
        </ul>
        <h2>Review Items</h2>
        <br />
        <br />
        <ul>
          {this.props.cartItems.map(item => (
            <div key={item.id}>
              <li>
                <h3>{item.name}</h3> <br />
              </li>
              <li>
                <h3>{item.description}</h3> <br />
              </li>
              <li>
                <h3>{item.qty}</h3> <br />
              </li>
              <li>
                <h3>{item.price}</h3> <br />
              </li>
            </div>
          ))}
        </ul>
        <h2>Order Total</h2>
        <br />
        {this.props.total}

        <button type="submit" onClick={this.continue}>
          Confirm & Checkout
        </button>
      </div>
    )
  }
}

const mapState = () => {}

const mapDispatch = dispatch => ({
  addOrder: newOrder => dispatch(updateOrderHistory(newOrder)),
  addAddress: newAddress => dispatch(updateUserAddresses(newAddress))
})

export default connect(mapState, mapDispatch)(ConfirmOrder)
