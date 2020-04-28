import axios from 'axios'

//action types
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const CREATE_ORDER = 'CREATE_ORDER'

//action creators
export const gotCart = cart => ({
  type: GET_CART,
  cart
})

export const updatedCart = cart => ({
  type: UPDATE_CART,
  cart
})

export const updatedProducrCart = cart => ({
  type: UPDATE_PRODUCT,
  cart
})

export const deletedProduct = cart => ({
  type: DELETE_PRODUCT,
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

export const updateCartDbProduct = (
  orderId,
  orderProduct
) => async dispatch => {
  try {
    const res = await axios.put(`api/orderProduct/${orderId}`, orderProduct)
    dispatch(updatedProducrCart(res.data))
    console.log('INSIDE THE UPDATE THUNK', res.data)
  } catch (error) {
    console.error(error)
  }
}

export const deleteProductFromDbCart = (
  productId,
  orderId
) => async dispatch => {
  try {
    const res = await axios.delete(`api/order/${orderId}`, productId, qty)
    dispatch(deletedProduct(res.data))
  } catch (error) {
    console.error(error)
  }
}

export default function cartStoreReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart

    case UPDATE_CART:
      return action.cart

    case UPDATE_PRODUCT:
      return action.cart

    case DELETE_PRODUCT:
      return action.cart

    default:
      return state
  }
}
