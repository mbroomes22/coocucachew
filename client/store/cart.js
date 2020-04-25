import axios from 'axios'

//action types
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_QTY = 'UPDATE_QTY'
const REMOVE_ITEM = 'REMOVE_ITEM'
const EMPTY_CART = 'EMPTY_CART'
const GET_TOTAL_PRICE = 'GET_TOTAL_PRICE'

//action creators
export const gotCart = cart => ({
  type: GET_CART,
  cart
})

export const addedToCart = (order, item) => ({
  type: ADD_TO_CART,
  order,
  item
})

export const updatedQty = qty => ({
  type: UPDATE_QTY,
  qty
})

export const removedItem = itemId => ({
  type: REMOVE_ITEM,
  itemId
})

export const emptyCart = () => ({
  type: EMPTY_CART
})

export const gotTotalPrice = totalPrice => ({
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

export const fetchCart = userId => {
  return async dispatch => {
    console.log('in fetch cart dispatch before request')
    if (!userId) {
      dispatch(gotCart(null))
    } else {
      const {data} = await axios.get(`/api/orders/${userId}`)
      console.log('in fetch cart dispatch before request')
      dispatch(gotCart(data))
    }
  }
}

// response to 'add-to-cart'button
export const addToCart = (userId, product) => {
  return async dispatch => {
    const {data} = await axios.post(`/api/orders`, {userId, product})
    if (Array.isArray(data)) {
      dispatch(addedToCart(data[0], product))
    } else {
      dispatch(addedToCart(data, product))
    }
  }
}

// reponse to event when changing the qty
export const updateQty = (orderId, productId) => {
  return async dispatch => {
    const {data} = await axios.put(`/api/orders/${orderId}/${productId}`, {
      productId,
      orderId
    })
    dispatch(updatedQty(data))
  }
}

//remove item from cart
export const removeItem = (orderId, productId) => {
  return async dispatch => {
    const {data} = await axios.delete(`/api/orders/${orderId}/${productId}`, {
      orderId,
      productId
    })
    dispatch(removedItem(data))
  }
}

//^^^
//I finished it up to test- so I could use the reducer vvvvvv
//reducers
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    // case GET_CART: {
    //   if (!action.cart) {
    //     return state
    //   } else {
    //     const newState = {...state}
    //     const items = action.cart.items
    //     items.forEach((item) => {
    //       if (!newState.qty[item.productId]) {
    //         newState.qty[item.productId] = item.quantity
    //       }
    //     })
    //     return {
    //       ...newState,
    //       currentOrderId: action.cart.id,
    //       items: action.cart.product,
    //     }
    //   }
    // }
    case ADD_TO_CART: {
      const productId = action.item.id
      const newState = {...state}
      //try to find the product in qty obj, if it is exist, then qty ++; if not, then create a new one with productiD
      if (!newState.qty[productId]) {
        return {
          ...newState,
          currentOrderId: action.order.id,
          qty: {...newState.qty, [productId]: 1},
          items: [...newState.items, action.item]
        }
      } else {
        let increaseQty = newState.qty[productId] + 1
        return {
          ...newState,
          currentOrderId: action.order.id,
          qty: {...newState.qty, [productId]: increaseQty}
        }
      }
    }
    //     case UPDATE_QTY: {
    //     }
    //     case REMOVE_ITEM: {
    //     }
    //     case EMPTY_CART: {
    //     }
    //     case GET_TOTAL_PRICE: {
    //     }
  }
}
