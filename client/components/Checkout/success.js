// confirmation page and email
//props should access user email info and order number
import React from 'react'

const Success = () => {
  return (
    <div>
      {/* <p>{props.orders.id}</p> */}
      <h1>Thanks for your order!</h1>
      <h4>An order confirmation has been sent to your email.</h4>
    </div>
  )
}

export default Success
