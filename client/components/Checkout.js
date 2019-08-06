import React, {Component} from 'react'
import {connect} from 'react-redux'
import {checkout} from '../store/currentCart'
import {StripeProvider} from 'react-stripe-elements'
import {Elements} from 'react-stripe-elements'
import Stripe from './Stripe'

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
    const currentCart = this.props.cart.products
    const {isLoggedIn} = this.props

    if (isLoggedIn) {
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
                    return (
                      accumulator + product.cartItem.quantity * product.price
                    )
                  }, 0) / 100}
                </th>
              </tr>
            </table>
            {/* <h1>Billing and Payment Information</h1> */}
            <Stripe
              name="Payment Information"
              description="Please fill the fields below"
              amount={currentCart.reduce((accumulator, product) => {
                return accumulator + product.cartItem.quantity * product.price
              }, 0)}
            />
          </div>
        )
      }
    } else if (!this.props.cart) {
      return <h1>Loading!</h1>
    } else {
      console.log(this.props.cart)
      return (
        <div>
          <h1>Order Summary</h1>
          <table>
            <tr>
              <th>Items</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
            {this.props.cart.map(product => {
              return (
                <tr>
                  <td>{product.title}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price / 100}</td>
                </tr>
              )
            })}
            <tr>
              <th>Total:</th>
              <th />
              <th>
                ${this.props.cart.reduce((accumulator, product) => {
                  return accumulator + product.quantity * product.price
                }, 0) / 100}
              </th>
            </tr>
          </table>
          {/* <h1>Billing and Payment Information</h1> */}
          <Stripe
            name="Payment Information"
            description="Please fill the fields below"
            amount={this.props.cart.reduce((accumulator, product) => {
              return accumulator + product.quantity * product.price
            }, 0)}
          />
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  cart: state.currentCart,
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  checkout: () => {
    dispatch(checkout())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
