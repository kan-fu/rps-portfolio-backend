const axios = require('axios').default
const pctChanges = require('./pct_us.json')

const headers = {
  Authorization: 'bearer ',
}

const foo = async () => {
  for (let pctChange of pctChanges) {
    await axios.post('http://localhost:3000/api/v1/us/pctChanges', pctChange, {
      headers: headers,
    })
  }
}

foo()
