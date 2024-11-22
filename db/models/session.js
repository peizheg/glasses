const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    artist: {
        type: String,
        required: true,
    },
    song: {
        type: String,
        required: true,
    },
    lyrics: {
        type: String,
        required: true,
    }
})

sessionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Session', sessionSchema)