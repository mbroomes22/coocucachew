// confirmation page confirming address and payment info
//props should access db to find and show user's input address and payment from checkout page
import React, {Component} from 'react'
// import MultiThemeProvider from 'material-ui/styles/MultiThemeProvider'
// import AppBar from 'material-ui/AppBar'
// import {List, ListItem} from 'material-ui/List'
// import RaisedButton from 'material-ui/RaisedButton'

export default class ConfirmOrder extends Component {
  continue = evt => {
    evt.preventDefault()
    //Process form -send data to DB
    this.props.nextStep()
  }

  goBack = evt => {
    evt.preventDefault()
    this.props.prevStep()
  }

  render() {
    const {
      values: {
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
    } = this.props
    return (
      // <MultiThemeProvider>
      //   <React.Fragment>
      //     <AppBar title="Confirm Order Details" />

      //     <List>
      //       <ListItem
      //         primaryText="First Name"
      //         secondaryText={ firstName }
      //       />
      //       <ListItem
      //         primaryText="Last Name"
      //         secondaryText={ lastName }
      //       />
      //       <ListItem
      //         primaryText="Email"
      //         secondaryText={ email }
      //       />
      //       <ListItem
      //         primaryText="Street Address"
      //         secondaryText={ streetAddress }
      //       />
      //       <ListItem
      //         primaryText="Zipcode"
      //         secondaryText={ zipCode }
      //       />
      //       <ListItem
      //         primaryText="Country"
      //         secondaryText={ country }
      //       />
      //       <ListItem
      //         primaryText="Card Number"
      //         secondaryText={ cardNum }
      //       />
      //       <ListItem
      //         primaryText="Card exp. date"
      //         secondaryText={ cardExp }
      //       />
      //       <ListItem
      //         primaryText="CVV"
      //         secondaryText={ cardCVV }
      //       />
      //     </List><br />

      //     <RaisedButton
      //       label= "Confirm & Checkout"
      //       primary= "true"
      //       onClick= {this.continue}
      //     />
      //     <RaisedButton
      //       label= "Return to Payment Details"
      //       primary= "true"
      //       onClick= {this.goBack}
      //     />
      //   </React.Fragment>
      // </MultiThemeProvider>

      <div>
        <button type="submit" onClick={this.goBack}>
          Return to Payment Details
        </button>
        <h1>Confirm Order Details</h1>
        <ul>
          <li>
            First Name <br /> {firstName}
          </li>
          <li>
            Last Name <br /> {lastName}
          </li>
          <li>
            Email <br /> {email}
          </li>
          <li>
            Street Address <br /> {streetAddress}
          </li>
          <li>
            Zipcode <br /> {zipCode}
          </li>
          <li>
            Country <br /> {country}
          </li>
          <li>
            Card Number <br /> {cardNum}
          </li>
          <li>
            Card Exp. date <br /> {cardExp}
          </li>
          <li>
            CVV <br /> {cardCVV}
          </li>
        </ul>

        <button type="submit" onClick={this.continue}>
          Confirm & Checkout
        </button>
      </div>
    )
  }
}
