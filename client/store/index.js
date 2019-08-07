import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allProducts from './allProducts'
import singleProduct from './singleProduct'
import currentCart from './currentCart'
import pastCarts from './pastCarts'

const reducer = combineReducers({
  currentCart,
  user,
  allProducts,
  singleProduct,
  pastCarts
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './allProducts'
export * from './singleProduct'
export * from './currentCart'
export * from './pastCarts'
