import axios from 'axios'

//action types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_QTY = 'UPDATE_QTY'
const REMOVE_ITEM = 'REMOVE_ITEM'
const EMPTY_CART = 'EMPTY_CART'
const GET_TOTAL_PRICE = 'GET_TOTAL_PRICE'

//action creators
export const getCart = cart => ({
  type: GET_CART,
  cart
})

export const addedToCart = orderProduct => ({
  type: ADD_TO_CART,
  orderProduct
})

export const updateQty = qty => ({
  type: UPDATE_QTY,
  qty
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
  cart: []
}

//thunks
export const fetchCart = () => async dispatch => {
  try {
    const res = await axios.get('api/order')
    dispatch(getCart(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const addToCart = (orderId, orderProduct) => {
  return async dispatch => {
    const {data} = await axios.post(`/api/orders/${orderId}`, orderProduct)
    dispatch(addedToCart(data))
  }
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      console.log('inside cart reducer', action.cart)
      return action.cart

    case ADD_TO_CART:
      return [...state, action.orderProduct]

    default:
      return state
  }
}
