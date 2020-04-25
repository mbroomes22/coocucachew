import React from 'react'
import {connect} from 'react-redux'
import {AllProducts} from './'
// import { CartList } from './cartList'
import axios from 'axios'

const defaultState = {cart: localStorage.cart}

export class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  //   componentDidMount(){
  //       const userCart = axios.get('api/users')
  //   }

  render() {
    localStorage.setItem('state', defaultState)
    console.log(localStorage)
    return <div>{/* <CartList state={this.state} /> */}</div>
  }
}

export default connect(null, null)(Cart)
