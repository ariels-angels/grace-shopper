import React, {Component} from 'react'
import {connect} from 'react-redux'
import {checkout} from '../store/currentCart'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit() {
    event.preventDefault()
    await this.props.checkout()
    this.props.history.push('/products')
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
          <form onSubmit={this.handleSubmit}>
            <h2>Address:</h2>
            <label>Street:</label>
            <input />
            <label>Apt (Optional):</label>
            <input />
            <label>City:</label>
            <input />
            <label>State:</label>
            <input />
            <label>Zip code:</label>
            <input />
            <label>Country:</label>
            <input />
            <h2>Card Details:</h2>
            <label>Name on card:</label>
            <input />
            <label>Credit card number:</label>
            <input />
            <label>Expiration date:</label>
            <input />
            <label>CVC:</label>
            <input />
            <label>Zip code:</label>
            <input />
            <br />
            <button type="submit">Submit Payment</button>
          </form>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  cart: state.currentCart.products
})

const mapDispatchToProps = dispatch => ({
  checkout: () => {
    dispatch(checkout())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
