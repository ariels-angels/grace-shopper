import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItems from './CartItems'
import {getCurrentCart, deleteFromCart} from '../store/currentCart'

class Cart extends Component {
  async componentDidMount() {
    await this.props.getCurrentCart()
  }
  delete(productId) {
    this.props.deleteFromCart(productId)
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
            <h1>Current Cart:</h1>
            {cartProducts.map(cartItem => {
              return <CartItems key={cartItem.id} {...cartItem} />
            })}
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
