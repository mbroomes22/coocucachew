import axios from 'axios'

//action types
const GET_PRODUCTS = 'GET_PRODUCTS'

//action creators
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

//initialState
const initialProducts = {}

//thunk creators
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

export default function productsReducer(state = initialProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      // console.log('inside products reducer', action)
      return action.products
    default:
      return state
  }
}
