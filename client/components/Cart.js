/* eslint-disable no-lonely-if */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartItems from './CartItems'
import {getCurrentCart, deleteFromCart} from '../store/currentCart'

class Cart extends Component {
  async componentDidMount() {
    await this.props.getCurrentCart()
  }

  delete(productId) {
    console.log(productId)
    const body = {id: productId}
    this.props.deleteFromCart(body)
  }

  render() {
    const {products, currentCart, user, isLoggedIn} = this.props

    if (isLoggedIn) {
      if (!currentCart) {
        return <h1>Loading</h1>
      } else {
        const cartProducts = currentCart.products
        if (!cartProducts) {
          return <h1>Loading</h1>
        } else {
          return (
            <div>
              <h1>My Cart:</h1>
              {!cartProducts[0] ? (
                <h4>
                  Your cart is empty! Continue shopping{' '}
                  <Link to="/products">here</Link>
                </h4>
              ) : (
                <div>
                  {cartProducts.map(cartItem => (
                    <div>
                      <CartItems key={cartItem.id} {...cartItem} />
                      <button onClick={() => this.delete(cartItem.id)}>
                        Delete Item
                      </button>
                    </div>
                  ))}
                  <div>
                    Total ({cartProducts.reduce((accumulator, product) => {
                      return accumulator + product.cartItem.quantity
                    }, 0)}{' '}
                    items): $
                    {cartProducts.reduce((accumulator, product) => {
                      return (
                        accumulator + product.cartItem.quantity * product.price
                      )
                    }, 0) / 100}
                  </div>
                  <div>
                    <button
                      onClick={() => this.props.history.push('/checkout')}
                    >
                      Checkout
                    </button>
                  </div>
                  <div>
                    Continue shopping <Link to="/products">here!</Link>
                  </div>
                  <br />
                </div>
              )}
            </div>
          )
        }
      }
    } else {
      if (!currentCart) {
        return <h1>Loading</h1>
      } else {
        if (!currentCart) {
          return <h1>Loading</h1>
        } else {
          return (
            <div>
              <h1>My Cart:</h1>
              {!currentCart[0] ? (
                <h4>
                  Your cart is empty! Continue shopping{' '}
                  <Link to="/products">here</Link>
                </h4>
              ) : (
                <div>
                  {currentCart.map(cartItem => (
                    <div>
                      <CartItems key={cartItem.id} {...cartItem} />
                      <button onClick={() => this.delete(cartItem.id)}>
                        Delete Item
                      </button>
                    </div>
                  ))}
                  <div>
                    Total ({currentCart.reduce((accumulator, product) => {
                      return accumulator + product.quantity
                    }, 0)}{' '}
                    items): $
                    {currentCart.reduce((accumulator, product) => {
                      return accumulator + product.quantity * product.price
                    }, 0) / 100}
                  </div>
                  <div>
                    <button
                      onClick={() => this.props.history.push('/checkout')}
                    >
                      Checkout
                    </button>
                  </div>
                  <div>
                    Continue shopping <Link to="/products">here!</Link>
                  </div>
                  <br />
                </div>
              )}
            </div>
          )
        }
      }
    }
  }
}

const mapStateToProps = state => ({
  products: state.allProducts,
  currentCart: state.currentCart,
  user: state.user,
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  getCurrentCart: () => dispatch(getCurrentCart()),
  deleteFromCart: id => dispatch(deleteFromCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
