const PortfolioUS = require('../../../models/portfolioUS')
const middleware = require('../../../utils/middleware')
const portfoliosUSRouter = require('express').Router()

portfoliosUSRouter.get('/', async (req, res) => {
  const portfolios = await PortfolioUS.find({})
  return res.json(portfolios.map((portfolio) => portfolio.toJSON()))
})

portfoliosUSRouter.post('/', middleware.userExtractor, async (req, res) => {
  const user = req.user

  if (!(user && user.isAdmin)) {
    return res.status(401).json({ error: 'need admin to post' })
  }

  const portfolio = new PortfolioUS({
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

portfoliosUSRouter.put('/', middleware.userExtractor, async (req, res) => {
  const user = req.user

  if (!(user && user.isAdmin)) {
    return res.status(401).json({ error: 'need admin to post' })
  }

  const portfolio = await PortfolioUS.findOneAndReplace(
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

module.exports = portfoliosUSRouter
