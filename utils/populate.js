const axios = require('axios').default
const pctChanges = require('./etf_porfolio_top.json')
require('dotenv').config({ path: '../.env' })
const BACKEND_URL = 'http://localhost:3000/api/v1'

const headers = {
  Authorization: `bearer ${process.env.TOKEN}`,
}

const foo = async () => {
  for (let pctChange of [pctChanges]) {
    await axios.post(`${BACKEND_URL}/etf/portfolios/top`, pctChange, {
      headers: headers,
    })
  }
}

foo()
