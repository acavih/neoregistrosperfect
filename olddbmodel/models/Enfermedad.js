const mongoose = require('mongoose')

const EnfermdedadSchema = new mongoose.Schema({
    name: {
        type: String
    }
})

module.exports = mongoose.model('enfermedades', EnfermdedadSchema)