const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const portfolioSchema = new mongoose.Schema({
  date: { type: Date, unique: true },
  rps250_1: String,
  rps250_3: String,
  rps120_1: String,
  rps120_3: String,
  rps50_1: String,
  rps50_3: String,
  rps5_1: String,
  rps5_3: String,
  rps5_50_1: String,
  rps5_50_3: String,
})
portfolioSchema.plugin(uniqueValidator)
portfolioSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
    returnedObject.date = returnedObject.date.toISOString().split('T')[0]
    //for (const key in returnedObject) {
    //returnedObject[key] = returnedObject[key].replace(/SH\.|SZ\./g,'')
    //}
  },
})

module.exports = mongoose.model('EtfBotPortfolio', portfolioSchema)
