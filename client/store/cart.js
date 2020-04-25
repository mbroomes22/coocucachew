import axios from 'axios'

//action types

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_QTY = 'UPDATE_QTY'
const REMOVE_ITEM = 'REMOVE_ITEM'
const EMPTY_CART = 'EMPTY_CART'
const GET_TOTAL_PRICE = 'GET_TOTAL_PRICE'

//action creators

export const getCart = cartData => ({
  type: GET_CART,
  cartData
})

export const addToCart = (order, item) => ({
  type: ADD_TO_CART,
  order,
  item
})

export const updateQty = qty => ({
  type: UPDATE_QTY,
  qtyData
})

export const removeItem = itemId => ({
  type: REMOVE_ITEM,
  itemId
})

export const emptyCart = () => ({
  type: EMPTY_CART
})

export const getTotalPrice = totalPrice => ({
  type: GET_TOTAL_PRICE,
  totalPrice
})

//initial state

const initialState = {
  orderId: null,
  item: [],
  qty: {},
  total: 0
}

//thunks

//- reach cart when click CART button
//****need to build order component && database . the cart should read the order dateabase, and we should have the routes like /orders/userId. isAdmin can see the /orders, isAuth can see the /orders/userId*/

export const fetchCart = userId => {
  return async dispatch => {
    if (!userId) {
      dispatch(getCart(null))
    } else {
      const {data} = await axios.get(`api/orders/cart/${userId}`)
      dispatch(getCart(data))
    }
  }
}
//****not finish, also think about add-To-Cart button which will use POST, and remove item which will use delete */
