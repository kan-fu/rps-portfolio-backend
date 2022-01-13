const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
require('express-async-errors')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression');

const indexRouter = require('./routes/index')
// const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const sinaRouter = require('./routes/sina')
const stockPortfoliosRouter = require('./routes/api/v1/stock/portfolios')
const stockPortfoliosUSRouter = require('./routes/api/v1/stock/portfoliosUS')
const stockPctChangesRouter = require('./routes/api/v1/stock/pctChanges')
const stockPctChangesUSRouter = require('./routes/api/v1/stock/pctChangesUS')
const etfBotPctChangesRouter = require('./routes/api/v1/etf/pctChangesBot')
const etfTopPctChangesRouter = require('./routes/api/v1/etf/pctChangesTop')
const etfBotPortfoliosRouter = require('./routes/api/v1/etf/portfoliosBot')
const etfTopPortfoliosRouter = require('./routes/api/v1/etf/portfoliosTop')

const middleware = require('./utils/middleware')

const app = express()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connection to MongoDB:', error.message)
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(compression())
app.use(helmet())
app.use(cors())
app.use(logger('common'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(middleware.tokenExtractor)

app.use('/', indexRouter)
// app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/api/v1/sina', sinaRouter)
app.use('/api/v1/stock/portfolios/cn', stockPortfoliosRouter)
app.use('/api/v1/stock/pctChanges/cn', stockPctChangesRouter)
app.use('/api/v1/stock/portfolios/us', stockPortfoliosUSRouter)
app.use('/api/v1/stock/pctChanges/us', stockPctChangesUSRouter)
app.use('/api/v1/etf/pctChanges/bot', etfBotPctChangesRouter)
app.use('/api/v1/etf/pctChanges/top', etfTopPctChangesRouter)
app.use('/api/v1/etf/portfolios/bot', etfBotPortfoliosRouter)
app.use('/api/v1/etf/portfolios/top', etfTopPortfoliosRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'token missing or invalid',
    })
  }

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
