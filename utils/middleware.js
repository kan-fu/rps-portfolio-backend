const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  req.token = null

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.slice(7)
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const token = req.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  req.user = await User.findById(decodedToken.id)
  next()
}

module.exports = {
  tokenExtractor,
  userExtractor,
}
