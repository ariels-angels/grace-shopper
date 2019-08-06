import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'
import {checkout} from '../store/currentCart'

const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_live_MY_PUBLISHABLE_KEY'
    : 'pk_test_pcqu6pAABewUcgfRFVpF0zbL007BgzXUKQ'

const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://grace-shredder-1906.herokuapp.com/api/payments'
    : 'http://localhost:7693/api/payments'

const CURRENCY = 'USD'

const successPayment = (data, checkOut) => {
  checkOut()
  alert('Payment Successful')
}

const errorPayment = data => {
  alert('Payment Error')
}

const onToken = (amount, description, checkOut) => token =>
  axios
    .post('/api/payments', {
      description,
      source: token.id,
      currency: CURRENCY,
      amount
    })
    .then(checkOut)
    .catch(errorPayment)

const Checkout = ({name, description, amount, checkOut}) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={amount}
    token={onToken(amount, description, checkOut)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
)

const mapDispatchToProps = dispatch => ({
  checkOut: () => {
    dispatch(checkout())
  }
})

export default connect(null, mapDispatchToProps)(Checkout)
