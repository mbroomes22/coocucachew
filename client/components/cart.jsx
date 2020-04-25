// import React from 'react'
// import {connect} from 'react-redux'
// import {fetchCart} from '../store/cart'

// // const localCart = localStorage.cart
// // const defaultState = { cart: localCart }

// export class Cart extends React.Component {
//   componentDidMount() {
//     // this.props.getCart(this.props.user.id)
//     console.log('dbCart in component did mount', this.props)
//     // if (localCart[0]) {
//     //   this.setState(
//     //     { cart : localCart })
//     // } else {
//     //   this.setState(
//     //     { cart : dbCart })
//     // }
//   }

//   render() {
//     // const dbCart = this.props.getCart(this.props.user.id)
//     // localStorage.setItem('state', defaultState)
//     // console.log('local storage in render', localStorage)
//     console.log('props in render', this.props)
//     // console.log('state in render', this.state)
//     return <div />
//   }
// }

// const mapState = state => ({
//   cart: state.cart,
//   user: state.user
// })

// const mapDispatch = dispatch => ({
//   getCart: userId => dispatch(fetchCart(userId))
// })

// export default connect(mapState, mapDispatch)(Cart)
