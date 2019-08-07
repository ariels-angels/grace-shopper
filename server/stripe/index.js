const configureStripe = require('stripe')
const bodyParser = require('body-parser')

const STRIPE_SECRET_KEY =
  process.env.NODE_ENV === 'production'
    ? 'sk_live_MY_SECRET_KEY'
    : 'sk_test_HFlmK9RxeyUAqiHwMhmJriEs004ayVg3VN'

const stripe = configureStripe(STRIPE_SECRET_KEY)

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({error: stripeErr})
  } else {
    res.status(200).send({success: stripeRes})
  }
}

const paymentApi = app => {
  app.get('/api/payments', (req, res) => {
    res.send({
      message: 'Hello Stripe checkout server!',
      timestamp: new Date().toISOString()
    })
  })

  app.post('/api/payments', async (req, res) => {
    try {
      await stripe.charges.create(req.body, postStripeCharge(res))
    } catch (error) {
      console.log(error.message)
    }
  })

  return app
}

const configureRoutes = app => {
  app.use(bodyParser.json())
  paymentApi(app)
}

module.exports = {configureRoutes}
