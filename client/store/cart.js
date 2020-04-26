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

export const addedToCart = (order, orderProduct) => ({
  type: ADD_TO_CART,
  order,
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
  currentOrderId: null,
  items: [],
  qty: {},
  total: 0
}

//thunks

//- reach cart when click CART button
//****need to build order component && database . the cart should read the order dateabase, and we should have the routes like /orders/userId. isAdmin can see the /orders, isAuth can see the /orders/userId*/

export const fetchCart = () => async dispatch => {
  try {
    // if (!userId) {
    //   dispatch(getCart(null))
    // } else {
    const res = await axios.get('api/order')
    console.log('in fetch cart dispatch AFTER request', res)
    dispatch(getCart(res.data))
    // }
  } catch (error) {
    console.error(error)
  }
}

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

//****not finish, also think about add-To-Cart button which will use POST, and remove item which will use delete */

//^^^
//I finished it up to test- so I could use the reducer vvvvvv

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      console.log('inside cart reducer', action.cart)
      return action.cart

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
