// import React from 'react'
// import {connect} from 'react-redux'
// import AllProducts from './AllProducts'
// // import {addNewProduct} from '../store/products'

// const defaultState = []

// export class CartList extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = []
//     this.handleChange = this.handleChange.bind(this)
//   }

//   handleChange(e) {
//     this.setState({
//       [e.target.name]: e.target.value
//     })
//   }

//   handleFormSubmit = () => {
//     const { user, price } = this.props;
//     localStorage.setItem('20', price);
//     localStorage.setItem('user', rememberMe ? user : '');
//   };

//   render() {
//     return (
//       <div>
//         {
//             Products.map(product =>(
//                 <div key={product.id}>
//                     <p>{product.name}</p>
//                     <p>{product.price}</p>
//                 </div>
//             ))
//         }
//       </div>
//     )
//   }
// }
