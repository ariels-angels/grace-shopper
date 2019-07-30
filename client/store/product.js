import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_PRODUCTS = 'GOT_PRODUCTS'

/**
 * ACTION CREATORS
 */
const gotAllProducts = products => ({type: GOT_PRODUCTS, products})

/**
 * THUNK CREATORS
 */
export const getAllProducts = () => async dispatch => {
  const {data} = await axios.get('/api/products')
  dispatch(gotAllProducts(data))
}

/**
 * REDUCER
 */
export default function(productList = [], action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return {productList: action.products}
    default:
      return productList
  }
}
