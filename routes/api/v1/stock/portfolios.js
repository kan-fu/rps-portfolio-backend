const Portfolio = require('../../../../models/stock/portfolio')
const middleware = require('../../../../utils/middleware')
const portfoliosRouter = require('express').Router()

// portfoliosRouter.get('/', async (req, res) => {
//   const portfolios = await Portfolio.find({})
//   return res.json(portfolios.map((portfolio) => portfolio.toJSON()))
// })

portfoliosRouter.post('/', middleware.userExtractor, async (req, res) => {
  const user = req.user

  if (!(user && user.isAdmin)) {
    return res.status(401).json({ error: 'need admin to post' })
  }

  const documentLength = await Portfolio.count({})
  if (documentLength > 1) {
    return res.status(401).json({ error: 'can only post when empty!' })
  }

  const portfolio = new Portfolio({
    date: req.body.date,
    D10: req.body.D10,
    D10GT: req.body.D10GT,
    D10LS: req.body.D10LS,
    D30: req.body.D30,
    D30GT: req.body.D30GT,
    D30W10GT: req.body.D30W10GT,
    D30LS: req.body.D30LS,
    D30LSW5LS: req.body.D30LSW5LS,
    D5: req.body.D5,
    D5GT: req.body.D5GT,
    D5LS: req.body.D5LS,
    D5R: req.body.D5R,
    RPS: req.body.RPS,
    W10: req.body.W10,
    W10GT: req.body.W10GT,
    W10LS: req.body.W10LS,
    W5: req.body.W5,
    W5GT: req.body.W5GT,
    W5LS: req.body.W5LS,
    W5R: req.body.W5R,
  })
  const savedPortfolio = await portfolio.save()
  res.json(savedPortfolio.toJSON())
})

portfoliosRouter.put('/', middleware.userExtractor, async (req, res) => {
  const user = req.user

  if (!(user && user.isAdmin)) {
    return res.status(401).json({ error: 'need admin to post' })
  }

  const portfolio = await Portfolio.findOneAndReplace(
    {},
    {
      date: req.body.date,
      D10: req.body.D10,
      D10GT: req.body.D10GT,
      D10LS: req.body.D10LS,
      D30: req.body.D30,
      D30GT: req.body.D30GT,
      D30W10GT: req.body.D30W10GT,
      D30LS: req.body.D30LS,
      D30LSW5LS: req.body.D30LSW5LS,
      D5: req.body.D5,
      D5GT: req.body.D5GT,
      D5LS: req.body.D5LS,
      D5R: req.body.D5R,
      RPS: req.body.RPS,
      W10: req.body.W10,
      W10GT: req.body.W10GT,
      W10LS: req.body.W10LS,
      W5: req.body.W5,
      W5GT: req.body.W5GT,
      W5LS: req.body.W5LS,
      W5R: req.body.W5R,
    },
    { new: true }
  )
  res.json(portfolio.toJSON())
})

module.exports = portfoliosRouter
