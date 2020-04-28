import axios from 'axios'

//action types
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'
const CREATE_ORDER = 'CREATE_ORDER'
const UPDATE_ORDERPRODUCT = 'UPDATE_ORDERPRODUCT'

//action creators
export const gotCart = cart => ({
  type: GET_CART,
  cart
})

export const updatedCart = cart => ({
  type: UPDATE_CART,
  cart
})

export const updatedDbOrderProduct = cart => ({
  type: UPDATE_ORDERPRODUCT,
  cart
})

export const newOrder = cart => ({
  type: CREATE_ORDER,
  cart
})

//initial state
const initialState = {}

//thunks
export const fetchCart = () => async dispatch => {
  try {
    const res = await axios.get('api/order')
    dispatch(gotCart(res.data))
    // console.log('inside fetch cart',res.data)
  } catch (error) {
    console.error(error)
  }
}

export const updateOrder = (order, orderId) => async dispatch => {
  try {
    const res = await axios.put(`api/order/${orderId}`, order)
    dispatch(updatedCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const updateDbOrderProduct = (
  orderId,
  orderProduct
) => async dispatch => {
  console.log('START RUNING THUNK', orderId)
  try {
    const res = await axios.put(`api/order/${orderId}`, orderProduct)
    dispatch(updatedDbOrderProduct(res.data))
    console.log('FINISH RUNING THUNK', res.data)
  } catch (error) {
    next(error)
  }
}

export default function cartStoreReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart

    case UPDATE_ORDERPRODUCT:
      return action.cart

    case UPDATE_CART:
      return action.cart

    default:
      return state
  }
}
