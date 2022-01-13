const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const pctChangeSchema = new mongoose.Schema({
  date: { type: Date, unique: true },
  rps250_1: Number,
  rps250_3: Number,
  rps120_1: Number,
  rps120_3: Number,
  rps50_1: Number,
  rps50_3: Number,
  rps5_1: Number,
  rps5_3: Number,
  rps120_250_1: Number,
  rps120_250_3: Number,
})
pctChangeSchema.plugin(uniqueValidator)
pctChangeSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.date = returnedObject.date.toISOString().split('T')[0]
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('ETFTopPctChange', pctChangeSchema)
