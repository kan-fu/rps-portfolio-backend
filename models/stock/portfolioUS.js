const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const portfolioUSSchema = new mongoose.Schema({
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
portfolioUSSchema.plugin(uniqueValidator)

portfolioUSSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
    returnedObject.date = returnedObject.date.toISOString().split('T')[0]
    //for (const key in returnedObject) {
    //returnedObject[key] = returnedObject[key].replace(/74\./g, '')
    //}
  },
})

module.exports = mongoose.model('Portfolio_US', portfolioUSSchema)
