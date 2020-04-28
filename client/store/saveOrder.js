import axios from 'axios'

//action type
export const UPDATE_USER_ORDER_HISTORY = 'UPDATE_USER_ORDER_HISTORY'
export const UPDATE_USER_ADDRESS = 'UPDATE_USER_ADDRESS'

//action creator
export const updateUserOrderHistory = newOrder => ({
  type: UPDATE_USER_ORDER_HISTORY,
  newOrder
})

export const updateUserAddress = newAddress => ({
  type: UPDATE_USER_ADDRESS,
  newAddress
})

//change isPending to false in orders db
//thunk creator
export const updateOrderHistory = (orderId, newOrderInfo) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/${orderId}`, newOrderInfo)
      dispatch(updateUserOrderHistory(data))
    } catch (error) {
      console.error('Sorry, could not process order:', error)
    }
  }
}

export const updateUserAddresses = (userId, newAddress) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userId}`, newAddress)
      dispatch(updateUserAddress(data))
    } catch (error) {
      console.error('Sorry, could not process address:', error)
    }
  }
}

//initial state

const initialState = {}

//reducer
export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_ORDER_HISTORY:
      return action.newOrder
    case UPDATE_USER_ADDRESS:
      return action.newAddress
    default:
      return state
  }
}
