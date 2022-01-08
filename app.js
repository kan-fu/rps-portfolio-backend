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
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const sinaRouter = require('./routes/sina')
const portfoliosRouter = require('./routes/api/v1/portfolios')
const portfoliosUSRouter = require('./routes/api/v1/portfoliosUS')
const pctChangesRouter = require('./routes/api/v1/pctChanges')
const pctChangesUSRouter = require('./routes/api/v1/pctChangesUS')

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
app.use('/users', usersRouter)
app.use('/login', loginRouter)
app.use('/api/v1/sina', sinaRouter)
app.use('/api/v1/cn/portfolios', portfoliosRouter)
app.use('/api/v1/cn/pctChanges', pctChangesRouter)
app.use('/api/v1/us/portfolios', portfoliosUSRouter)
app.use('/api/v1/us/pctChanges', pctChangesUSRouter)

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
