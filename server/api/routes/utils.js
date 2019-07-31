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
  }
}

//user 1 should only be able to see user 1's cart
