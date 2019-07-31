import axios from 'axios'

const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'

const gotSingleProduct = product => ({type: GOT_SINGLE_PRODUCT, product})

export const getSingleProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(gotSingleProduct(data))
  } catch (err) {
    console.error(err)
  }
}

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
