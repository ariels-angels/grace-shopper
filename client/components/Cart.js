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
      console.log(currentCart)
      return (
        <div>
          <h1>Hello World</h1>
        </div>
      )
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
