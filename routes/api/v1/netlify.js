const netlifyRouter = require('express').Router()
const middleware = require('../../../utils/middleware')
const axios = require('axios')

netlifyRouter.post('/', middleware.userExtractor, (req, res) => {
  const user = req.user

  if (!(user && user.isAdmin)) {
    return res.status(401).json({ error: 'need admin to post' })
  }

  axios
    .post(process.env.NETLIFY_URL, {})
  return res.status(200).json({ message: 'success' })
})
module.exports = netlifyRouter