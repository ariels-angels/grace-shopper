import React, {Component} from 'react'
import {connect} from 'react-redux'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    console.log('OUR PROPS:', this.props)
    const currentCart = this.props.cart
    if (!currentCart) {
      return <h1>Loading!</h1>
    } else {
      return (
        <div>
          <h1>Order Summary</h1>
          <table>
            <tr>
              <th>Items</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            {currentCart.map(product => {
              return (
                <tr>
                  <td>{product.title}</td>
                  <td>{product.cartItem.quantity}</td>
                  <td>${product.price / 100}</td>
                </tr>
              )
            })}
            <tr>
              <th>Total:</th>
              <th />
              <th>
                ${currentCart.reduce((accumulator, product) => {
                  return accumulator + product.cartItem.quantity * product.price
                }, 0) / 100}
              </th>
            </tr>
          </table>
          <h1>Billing and Payment Information</h1>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  cart: state.currentCart.products
})

export default connect(mapStateToProps, null)(Checkout)
