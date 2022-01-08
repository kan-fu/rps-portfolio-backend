const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const pctChangeSchema = new mongoose.Schema({
  date: { type: Date, unique: true },
  D10: Number,
  D10GT: Number,
  D10LS: Number,
  D30: Number,
  D30GT: Number,
  D30W10GT: Number,
  D30LS: Number,
  D30LSW5LS: Number,
  D5: Number,
  D5GT: Number,
  D5LS: Number,
  D5U: Number,
  RPS: Number,
  W10: Number,
  W10GT: Number,
  W10LS: Number,
  W5: Number,
  W5GT: Number,
  W5LS: Number,
  W5U: Number,
})
pctChangeSchema.plugin(uniqueValidator)
pctChangeSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.date = returnedObject.date.toISOString().split('T')[0]
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('PctChange', pctChangeSchema)
