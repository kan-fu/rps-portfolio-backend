const PctChange = require('../../../../models/etf/pctChangeTop')
const middleware = require('../../../../utils/middleware')
const PctChangesRouter = require('express').Router()

// PctChangesRouter.get('/', async (req, res) => {
//   const PctChanges = await PctChange.find({})
//   return res.json(PctChanges.map((PctChange) => PctChange.toJSON()))
// })

PctChangesRouter.post('/', middleware.userExtractor, async (req, res) => {
  const user = req.user

  if (!(user && user.isAdmin)) {
    return res.status(401).json({ error: 'need admin to post' })
  }

  const pctChange = new PctChange({
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
  const savedPctChange = await pctChange.save()
  res.json(savedPctChange.toJSON())
})

module.exports = PctChangesRouter
