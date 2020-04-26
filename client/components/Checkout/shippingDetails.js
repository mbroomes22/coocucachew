import React, {Component} from 'react'

export default class UserDetails extends Component {
  continue = evt => {
    evt.preventDefault()
    this.props.nextStep()
  }

  required = evt => {
    if (
      this.props.values.firstName &&
      this.props.values.lastName &&
      this.props.values.email
    ) {
      this.continue(evt)
    } else {
      alert('First Name, Last Name, and Email are required')
    }
  }

  render() {
    const {values, handleChange} = this.props
    return (
      <div>
        <h1>Enter Shipping Details</h1>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            onChange={handleChange}
            value={values.firstName}
          />
          <br />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            onChange={handleChange}
            value={values.lastName}
          />
          <br />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            placeholder="Enter email Address"
            onChange={handleChange}
            value={values.email}
          />
          <br />
        </label>
        <label>
          Street Address:
          <input
            type="text"
            name="streetAddress"
            placeholder="Enter Street Address"
            onChange={handleChange}
            value={values.streetAddress}
          />
          <br />
        </label>
        <label>
          Zipcode:
          <input
            type="text"
            name="zipCode"
            placeholder="Zipcode, eg. 10001"
            onChange={handleChange}
            value={values.zipCode}
          />
          <br />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            placeholder="State, eg. NY"
            onChange={handleChange}
            value={values.state}
          />
          <br />
        </label>
        <button type="submit" onClick={this.required}>
          Continue to Payment Details
        </button>
      </div>
    )
  }
}
