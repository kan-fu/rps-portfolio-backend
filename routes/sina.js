const express = require('express')
const sinaRouter = express.Router()
const SINA_API_URL = 'https://hq.sinajs.cn/list='
const axios = require('axios')
const iconv = require('iconv-lite')

sinaRouter.get('/:stockList', function (req, res, next) {
  axios
    .get(`${SINA_API_URL}${req.params.stockList}`, {
      responseType: 'arraybuffer',
      headers: {
        Referer:
          'https://finance.sina.com.cn/realstock/company/sz000002/nc.shtml',
      },
    })
    .then((response) => {
      res.send(iconv.decode(response.data, 'gbk'))
    })
    .catch((err) => console.log(err))
})

module.exports = sinaRouter
