import axios from 'axios'

//action type

const GET_A_PRODUCT = 'GET_A_PRODUCT'

//initial state

const product = []

//action creator

export const gotAProduct = product => ({
  type: GET_A_PRODUCT,
  product
})

//thunk

export const getAProduct = productId => {
  return async dispatch => {
    const {data} = await axios.get(`api/products/${productId}`)
    dispatch(gotAProduct(data))
  }
}

//reducer

export default function singleProductReducer(state = product, action) {
  switch (action.type) {
    case GET_A_PRODUCT:
      return action.product
    default:
      return state
  }
}
