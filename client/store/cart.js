import axios from 'axios'

//action types

const ADD_TO_CART = 'ADD_TO_CART'

//action creators

export const addedToCart = (order, orderProduct) => ({
  type: ADD_TO_CART,
  order,
  orderProduct
})

//initial state
const initialState = {
  currentOrderId: null,
  items: [],
  qty: {},
  total: 0
}

//thunks

export const addToCart = (userId, orderProduct) => {
  return async dispatch => {
    const {data} = await axios.post(`/api/order`, {userId, orderProduct})
    console.log('I AM RES.DATA:', data)
    if (Array.isArray(data)) {
      dispatch(addedToCart(data[0], orderProduct))
    } else {
      dispatch(addedToCart(data, orderProduct))
    }
  }
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const productId = action.orderProduct.id
      const newState = {...state}
      if (!newState.qty[productId]) {
        return {
          ...newState,
          currentOrderId: action.order.id,
          qty: {
            ...newState.qty,
            [productId]: 1
          },
          items: [...newState.items, action.item]
        }
      } else {
        let increase = newState.qty[productId] + 1
        return {
          ...newState,
          currentOrderId: action.order.id,
          qty: {
            ...newState.qty,
            [productId]: increase
          }
        }
      }

    default:
      return state
  }
}
