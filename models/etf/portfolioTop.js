const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema({
  date: Date,
  rps250_1: String,
  rps250_2: String,
  rps120_1: String,
  rps120_2: String,
  rps50_1: String,
  rps50_2: String,
  rps5_1: String,
  rps5_2: String,
  rps120_250_1: String,
  rps120_250_2: String,
})
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

module.exports = mongoose.model('EtfTopPortfolio', portfolioSchema)
