const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const portfolioSchema = new mongoose.Schema({
  date: { type: Date, unique: true },
  D10: String,
  D10GT: String,
  D10LS: String,
  D30: String,
  D30GT: String,
  D30W10GT: String,
  D30LS: String,
  D30LSW5LS: String,
  D5: String,
  D5GT: String,
  D5LS: String,
  D5R: String,
  RPS: String,
  W10: String,
  W10GT: String,
  W10LS: String,
  W5: String,
  W5GT: String,
  W5LS: String,
  W5R: String,
})
portfolioSchema.plugin(uniqueValidator)
portfolioSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
    // console.log(returnedObject)
    returnedObject.date = returnedObject.date.toISOString().split('T')[0]
    //for (const key in returnedObject) {
    //returnedObject[key] = returnedObject[key].replace(/SH\.|SZ\./g,'')
    //}
  },
})

module.exports = mongoose.model('Portfolio', portfolioSchema)
