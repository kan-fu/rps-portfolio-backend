const Portfolio = require('../../../../models/etf/portfolioTop')
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
    rps250_1: req.body.rps250_1,
    rps250_2: req.body.rps250_2,
    rps120_1: req.body.rps120_1,
    rps120_2: req.body.rps120_2,
    rps50_1: req.body.rps50_1,
    rps50_2: req.body.rps50_2,
    rps5_1: req.body.rps5_1,
    rps5_2: req.body.rps5_2,
    rps120_250_1: req.body.rps120_250_1,
    rps120_250_2: req.body.rps120_250_2,
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
      rps250_1: req.body.rps250_1,
      rps250_2: req.body.rps250_2,
      rps120_1: req.body.rps120_1,
      rps120_2: req.body.rps120_2,
      rps50_1: req.body.rps50_1,
      rps50_2: req.body.rps50_2,
      rps5_1: req.body.rps5_1,
      rps5_2: req.body.rps5_2,
      rps120_250_1: req.body.rps120_250_1,
      rps120_250_2: req.body.rps120_250_2,
    },
    { new: true }
  )
  res.json(portfolio.toJSON())
})

module.exports = portfoliosRouter
