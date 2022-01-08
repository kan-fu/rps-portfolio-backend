const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 1, // Limit each IP to 1 requests per `window` (here, per 60 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

usersRouter.post('/', apiLimiter, async (req, res) => {
  const body = req.body

  // Both username and password must be given and at leaset 3 characters long
  if (!body.username || !body.password) {
    return res
      .status(401)
      .json({ error: 'both username and password must be given!' })
  }

  if (body.username.length < 3 || body.password.length < 3) {
    return res.status(401).json({
      error: 'username and password must be at least 3 characters long',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash,
  })

  const savedUser = await user.save()

  res.json(savedUser)
})

module.exports = usersRouter
