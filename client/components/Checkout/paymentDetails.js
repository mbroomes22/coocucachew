//contains order form -- shipping address, payment info
import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

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
    const {values, handleChange} = this.props
    return (
      <div>
        <button type="submit" onClick={this.goBack}>
          Return to Shipping Details
        </button>
        <h1>Enter Payment Details</h1>
        <label>
          Credit Card Number:
          <input
            type="text"
            name="firstName"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            onChange={handleChange}
            value={values.cardNum}
          />
          <br />
        </label>
        <label>
          Exp. Date:
          <input
            type="text"
            name="cardExp"
            placeholder="01/24"
            onChange={handleChange}
            value={values.cardExp}
          />
          <br />
        </label>
        <label>
          CVV:
          <input
            type="text"
            name="cardCVV"
            placeholder="123"
            onChange={handleChange}
            value={values.cardCVV}
          />
          <br />
        </label>

        <button type="submit" onClick={this.continue}>
          Continue to Confirmation
        </button>
      </div>
    )
  }
}
