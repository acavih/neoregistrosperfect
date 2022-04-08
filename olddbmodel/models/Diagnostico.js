const mongoose = require('mongoose')

const EnfermdedadSchema = new mongoose.Schema({
    result: {
        type: Boolean,
        required: true
    },
    enfermedad: {
        type: mongoose.Types.ObjectId,
        ref: 'enfermedades',
        required: true
    },
    partner: {
        type: mongoose.Types.ObjectId,
        ref: 'members',
        required: true
    }
})

module.exports = mongoose.model('diagnosticos', EnfermdedadSchema)
