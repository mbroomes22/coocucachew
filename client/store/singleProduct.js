import axios from 'axios'

//action type

const GET_PRODUCT = 'GET_PRODUCT'

//initial state

const product = []

//action creator

export const gotProduct = product => ({
  type: GET_PRODUCT,
  product
})

//thunk

export const getProduct = productId => {
  return async dispatch => {
    const {data} = await axios.get(`api/${productId}`)
    dispatch(gotProduct(data))
  }
}

//reducer

export default function singleProductReducer(state = product, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
