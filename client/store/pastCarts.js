import axios from 'axios'

/**
 * ACTION TYPES
 */

const GOT_PAST_CARTS = 'GOT_PAST_CARTS'

/**
 * ACTION CREATORS
 */

const gotPastCarts = carts => ({type: GOT_PAST_CARTS, carts})

/**
 * THUNK CREATORS
 */
export const getPastCarts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/carts/past')
    dispatch(gotPastCarts(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * INITIAL STATE
 */

const initialState = []

/**
 * REDUCER
 */

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PAST_CARTS:
      return action.carts
    default:
      return state
  }
}
