import React, {Component} from 'react'

export default class UserDetails extends Component {
  continue = evt => {
    evt.preventDefault()
    this.props.nextStep()
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
            placeholder="First Name, eg. John"
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
            placeholder="Last Name, eg. Smith"
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
            placeholder="Email Address, eg. john@gmail.com"
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
            placeholder="Street Address, eg. 4 Main St."
            onChange={handleChange}
            value={values.streetAddress}
          />
          <br />
        </label>
        <label>
          Zipcode:
          <input
            type="text"
            name="zipcode"
            placeholder="Zipcode, eg. 10001"
            onChange={handleChange}
            value={values.zipcode}
          />
          <br />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            placeholder="Country, eg. USA"
            onChange={handleChange}
            value={values.country}
          />
          <br />
        </label>
        <button type="submit" onClick={this.continue}>
          Continue to Payment Details
        </button>
      </div>
    )
  }
}
