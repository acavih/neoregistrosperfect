const mongoose = require('mongoose')
const calcularEdad = require('../utils/calcularEdad')

const partner = new mongoose.Schema({
    codigo: { type: String },
    nombre: { type: String },
    apellidos: { type: String },
    fechanacimiento: { type: Date },
    sipcard: { type: String },
    correoelectronico: { type: String },
    telefono: { type: String },
    observaciones: { type: String },
    cosaspendientes: { type: String },
    sexo: { type: mongoose.Types.ObjectId, ref: 'resources' },
    socioono: { type: mongoose.Types.ObjectId, ref: 'resources' },
    nacionalidad: { type: mongoose.Types.ObjectId, ref: 'resources' },
    ciudadresidencia: { type: mongoose.Types.ObjectId, ref: 'resources' }
}, { toJSON: { virtuals: true } })

partner.virtual('edad')
    .get(function () {
        return calcularEdad(this.fechanacimiento)
    })

partner.set('toObject', { virtuals: true })
partner.set('toJSON', { virtuals: true })

const Partner = mongoose.model('members', partner)

module.exports = Partner
