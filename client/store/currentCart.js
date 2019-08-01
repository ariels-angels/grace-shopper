import axios from 'axios'

/**
 * ACTION TYPES
 */

const GOT_CURRENT_CART = 'GOT_CURRENT_CART'

const EDIT_CART = 'EDIT_CART'

/**
 * ACTION CREATORS
 */
const gotCurrentCart = cart => ({type: GOT_CURRENT_CART, cart})

const editCart = cart => ({type: EDIT_CART, cart})

/**
 * THUNK CREATORS
 */

export const getCurrentCart = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/carts/active`)
    dispatch(gotCurrentCart(data))
  } catch (err) {
    console.error(err)
  }
}

export const addToCurentCart = async info => {
  try {
    // const {data} =
    await axios.post('/api/carts/active', info)
    // dispatch(addToCart(data))
  } catch (err) {
    console.log(err)
  }
}

export const deleteFromCart = id => async dispatch => {
  try {
    const {data} = await axios.delete('/api/carts/active/', id)
    dispatch(gotCurrentCart(data))
  } catch (err) {
    console.log(err)
  }
}
/*
 * INITIAL STATE
 */

const initialState = {}

/**
 * REDUCER
 */

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_CURRENT_CART:
      return action.cart
    case EDIT_CART:
      return action.cart
    default:
      return state
  }
}
