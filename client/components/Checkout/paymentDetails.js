//contains order form -- shipping address, payment info
//needs props from Cart to get product price
import React from 'react'
// import StripeCheckout from 'react-stripe-checkout'
//import axios from 'axios'

export default class PaymentInfo extends React.Component {
  continue = evt => {
    evt.preventDefault()
    this.props.nextStep()
  }

  goBack = evt => {
    evt.preventDefault()
    this.props.prevStep()
  }

  // async handleToken = (token, address) => {
  //   const [product] = React.useState({
  //     name: this.props.cartItems.item.name,
  //     price: this.props.cartItems.item.price})
  //   const response = await axios.post("https://herokuproject...com/checkout", {
  //     token,
  //     product
  //   })
  //   const {status} =response.data
  //   if (status === 'success') {

  //   } else {

  //   }
  // }

  render() {
    return (
      <div>
        <br />
        <button type="submit" onClick={this.goBack}>
          Return to Shipping Details
        </button>
        <h1>Enter Payment Details with Stripe</h1>
        {/* <StripeCheckout
            stripeKey={pk_test_rKkcEpuxLMde62rJMWZRBUFF00hnMFCbCu}
            token={this.handleToken}
            billingAddress
            shippingAddress
            amount={this.props.cartItems.item.price}
            name={this.props.cartItems.item.name}
          /> */}
        <button type="submit" onClick={this.continue}>
          Continue to Confirmation
        </button>
      </div>
    )
  }
}
