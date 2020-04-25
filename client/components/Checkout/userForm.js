import React, {Component} from 'react'
import UserDetails from './shippingDetails'
import PaymentInfo from './paymentDetails'
import ConfirmOrder from './confirmOrder'
import Success from './success'

class UserForm extends Component {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    zipCode: '',
    country: '',
    cardNum: '',
    cardExp: '',
    cardCVV: ''
  }

  //continue to next step
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

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    const {
      step,
      firstName,
      lastName,
      email,
      streetAddress,
      zipCode,
      country,
      cardNum,
      cardExp,
      cardCVV
    } = this.state
    const values = {
      firstName,
      lastName,
      email,
      streetAddress,
      zipCode,
      country,
      cardNum,
      cardExp,
      cardCVV
    }

    switch (step) {
      case 1:
        return (
          <UserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        )
      case 2:
        return (
          <PaymentInfo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        )
      case 3:
        return (
          <ConfirmOrder
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        )
      case 4:
        return <Success />
      default:
        return <div />
    }
  }
}

export default UserForm
