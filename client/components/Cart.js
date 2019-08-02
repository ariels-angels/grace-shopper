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
    const {products, currentCart, user} = this.props
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
              cartProducts.map(cartItem => (
                <div>
                  <CartItems key={cartItem.id} {...cartItem} />
                  <button onClick={() => this.delete(cartItem.id)}>
                    Delete Item
                  </button>
                </div>
              ))
            )}
            <div>
              Total ({cartProducts.reduce((accumulator, product) => {
                return accumulator + product.cartItem.quantity
              }, 0)}{' '}
              items): $
              {cartProducts.reduce((accumulator, product) => {
                return accumulator + product.cartItem.quantity * product.price
              }, 0) / 100}
            </div>
            <h6>
              Continue shopping <Link to="/products">here!</Link>
            </h6>
            <br />
          </div>
        )
      }
    }
  }
}

const mapStateToProps = state => ({
  products: state.allProducts,
  currentCart: state.currentCart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getCurrentCart: () => dispatch(getCurrentCart()),
  deleteFromCart: id => dispatch(deleteFromCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
