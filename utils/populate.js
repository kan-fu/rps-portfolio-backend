const axios = require('axios').default
const pctChanges = require('./etf_top.json')
require('dotenv').config({ path: '../.env' })
// const BACKEND_URL = 'https://rps-portfolio.herokuapp.com/api/v1'
// const BACKEND_URL = 'http://localhost:3000/api/v1'

const headers = {
  Authorization: `bearer ${process.env.TOKEN}`,
}

const populate_pctchanges = async () => {
  for (let pctChange of pctChanges) {
    await axios.post(`${BACKEND_URL}/etf/pctchanges/top`, pctChange, {
      headers: headers,
    })
  }
}

// const populate_portfolio = async () => {
//   await axios.post(`${BACKEND_URL}/etf/portfolios/top`, portfolio, {
//     headers: headers,
//   })
// }

populate_pctchange()
