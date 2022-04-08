const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, default: '' },
    archived: { type: Boolean, default: false }
})

const Resource = mongoose.model('resources', resourceSchema)

module.exports = Resource
