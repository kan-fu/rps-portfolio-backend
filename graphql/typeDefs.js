const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    stockPctChanges(type: String): [StockPctChange]
    stockPortfolio(type: String): StockPortfolio
    etfPctChanges(type: String): [ETFPctChange]
    etfPortfolio(type: String): ETFPortfolio
  }

  type ETFPctChange {
    date: String
    rps250_1: Float
    rps250_2: Float
    rps120_1: Float
    rps120_2: Float
    rps50_1: Float
    rps50_2: Float
    rps5_1: Float
    rps5_2: Float
    rps5_50_1: Float
    rps5_50_2: Float
    rps120_250_1: Float
    rps120_250_2: Float
  }

  type ETFPortfolio {
    date: String
    rps250_1: String
    rps250_2: String
    rps120_1: String
    rps120_2: String
    rps50_1: String
    rps50_2: String
    rps5_1: String
    rps5_2: String
    rps5_50_1: String
    rps5_50_2: String
    rps120_250_1: String
    rps120_250_2: String
  }

  type StockPctChange {
    date: String
    D10: Float
    D10GT: Float
    D10LS: Float
    D30: Float
    D30GT: Float
    D30W10GT: Float
    D30LS: Float
    D30LSW5LS: Float
    D5: Float
    D5GT: Float
    D5LS: Float
    D5U: Float
    RPS: Float
    W10: Float
    W10GT: Float
    W10LS: Float
    W5: Float
    W5GT: Float
    W5LS: Float
    W5U: Float
  }

  type StockPortfolio {
    date: String
    D10: String
    D10GT: String
    D10LS: String
    D30: String
    D30GT: String
    D30W10GT: String
    D30LS: String
    D30LSW5LS: String
    D5: String
    D5GT: String
    D5LS: String
    D5U: String
    RPS: String
    W10: String
    W10GT: String
    W10LS: String
    W5: String
    W5GT: String
    W5LS: String
    W5U: String
  }
`

module.exports = typeDefs
