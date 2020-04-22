import axios from 'axios'

//action type
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_A_PRODUCT = 'GET_A_PRODUCT'

//initial state

const initialProducts = {}

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

export const getAProduct = productId => async dispatch => {
  try {
    console.log('get product thunk before dispatch', productId)
    const res = await axios.get(`api/products/${productId}`)
    dispatch(gotAProduct(res.data))
    console.log('get product thunk AFTER dispatch', res.data)
  } catch (err) {
    console.error(err)
  }
}

export const fetchProducts = () => async dispatch => {
  // console.log('before dispatching')
  try {
    const res = await axios.get('/api/products')
    dispatch(getProducts(res.data))
    // console.log('after dispatching in store')
  } catch (error) {
    console.error(error)
  }
}

//reducer

export default function singleProductReducer(state = initialProducts, action) {
  switch (action.type) {
    case GET_A_PRODUCT:
      return action.product
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
