const nodemailer = require('nodemailer')

module.exports = {
  adminGateway: function(req, res, next) {
    if (req.user.isAdmin) next()
    else {
      res.sendStatus(403)
    }
  },

  userGateway: function(req, res, next) {
    if (!req.user || req.user.id === req.params.id) next()
    else {
      res.sendStatus(403)
    }
  },

  emailConfirmation: function(email, cartId, totalPrice) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'graceshredder.fsa@gmail.com',
        pass: 'arielsangels'
      }
    })
    const mailOptions = {
      from: 'graceshredder.fsa@gmail.com',
      to: String(email),
      subject: `Thank you for your purchase from Grace Shredder:  Order #${cartId}`,
      html: `<h2 style="color:green;text-align:center;">Grace-Shredder!</h2> <h5 style="text-align:center;">Thank you for shopping with us.</h5>
      <p>Your order number is ${cartId} and your total was $${totalPrice}</p><h6 style="text-align:center;">Continue shopping at <a href="http://localhost:7693/cart">www.Grace-Shredder.com</a></h6>`
    }
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
}

//user 1 should only be able to see user 1's cart
