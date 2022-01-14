const StockPctChange = require('../models/stock/pctChange')
const StockPctChangeUS = require('../models/stock/pctChangeUS')
const StockPortfolio = require('../models/stock/portfolio')
const StockPortfolioUS = require('../models/stock/portfolioUS')

const ETFPctChangeTop = require('../models/etf/pctChangeTop')
const ETFPctChangeBot = require('../models/etf/pctChangeBot')
const ETFPortfolioTop = require('../models/etf/portfolioTop')
const ETFPortfolioBot = require('../models/etf/portfolioBot')

const resolvers = {
  Query: {
    stockPctChanges: async (_, args) => {
      const { type } = args
      let model
      if (type === 'us') {
        model = StockPctChangeUS
      } else {
        model = StockPctChange
      }
      const PctChanges = await model.find({})
      return PctChanges.map((StockPctChange) => StockPctChange.toJSON())
    },
    stockPortfolio: async (_, args) => {
      const { type } = args
      let model
      if (type === 'us') {
        model = StockPortfolioUS
      } else {
        model = StockPortfolio
      }
      const Portfolio = await model.find({})
      return Portfolio[0].toJSON()
    },
    etfPctChanges: async (_, args) => {
      const { type } = args
      let model
      if (type === 'top') {
        model = ETFPctChangeTop
      } else {
        model = ETFPctChangeBot
      }
      const PctChanges = await model.find({})
      return PctChanges.map((StockPctChange) => StockPctChange.toJSON())
    },
    etfPortfolio: async (_, args) => {
      const { type } = args
      let model
      if (type === 'top') {
        model = ETFPortfolioTop
      } else {
        model = ETFPortfolioBot
      }
      const Portfolio = await model.find({})
      return Portfolio[0].toJSON()
    },
  },
}

module.exports = resolvers
