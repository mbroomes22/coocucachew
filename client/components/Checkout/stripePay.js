//needs props from Cart to get product price
import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const onToken = token => {
  const body = {
    token: token
  }
  axios
    .post('http://localhost:3000/payment', body)
    .then(response => {
      console.log(response)
      alert('Payment Success')
    })
    .catch(error => {
      console.log('Payment Error: ', error)
      alert('Payment Error')
    })
}

// async onToken = (token) => {
//     const body = {
//         amount: price,
//         token: token
//     };
//     const res = await axios.post("http://localhost:3000/payment", body)
//         const {status} =res.data;
//         if (status === 'success') {
//             console.log(status);
//             alert("Payment Success");
//         } else {
//             console.log("Payment Error: ", error);
//             alert("Payment Error");
//         }
// };

const Purchase = props => (
  <StripeCheckout
    name="Coocucachew Checkout"
    stripeKey="pk_test_rKkcEpuxLMde62rJMWZRBUFF00hnMFCbCu" //or {pk_test_rKkcEpuxLMde62rJMWZRBUFF00hnMFCbCu}
    token={onToken}
    billingAddress
    // amount={props.cartItems.item.price * 100}
    amount={999}
  />
)

export default Purchase
