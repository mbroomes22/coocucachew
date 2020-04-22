import axios from 'axios'

//action type
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_A_PRODUCT = 'GET_A_PRODUCT'

//initial state

const product = []

//action creator

export const gotAProduct = product => ({
  type: GET_A_PRODUCT,
  product
})

const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})
//thunk

export const getAProduct = productId => {
  return async dispatch => {
    const {data} = await axios.get(`api/products/${productId}`)
    dispatch(gotAProduct(data))
  }
}

export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('../api/products')
    dispatch(getProducts(data))
  } catch (error) {
    console.error(error)
  }
}

//reducer

export default function singleProductReducer(state = product, action) {
  switch (action.type) {
    case GET_A_PRODUCT:
      return action.product
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
