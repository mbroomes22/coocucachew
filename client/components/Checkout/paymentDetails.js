//contains order form -- shipping address, payment info
import React from 'react'

export default class PaymentInfo extends React.Component {
  continue = evt => {
    evt.preventDefault()
    this.props.nextStep()
  }

  goBack = evt => {
    evt.preventDefault()
    this.props.prevStep()
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={this.goBack}>
          Return to Shipping Details
        </button>
        <h1>Enter Payment Details with Paypal or Stripe</h1>

        <button type="submit" onClick={this.continue}>
          Continue to Confirmation
        </button>
      </div>
    )
  }
}
