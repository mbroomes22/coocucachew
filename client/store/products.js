import axios from 'axios'

//action types
const GET_PRODUCTS = 'GET_PRODUCTS'

//action creators
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

//thunk creators
export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('../api/products')
    dispatch(getProducts(data))
  } catch (error) {
    console.error(error)
  }
}

//initialState
const initialState = {}
//reducer

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
