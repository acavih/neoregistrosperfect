require('dotenv/config')
const fs = require('fs')
const bcrypt = require('bcrypt')
const moment = require('moment')
const mongoose = require('mongoose')
const Partner = require('../models/Members')
const resources = require('../models/Resource')
const Atencion = require('../models/Atencion')
const User = require('../models/User')
const { connectDB } = require('../utils/connect-db')
const { SALTS } = require('../vars')

const log = console.log

const fsStream = fs.createWriteStream('./updatesDB.md')
console.log = text => fsStream.write(text + '\n')
fsStream.write('Hola mundo')

connectDB().then(main)

/**
 *
 * @param {import('mongodb').Db} db
 */
async function main (db) {
    log('CONECTADO A LA BASE DE DATOS ' + process.env.DB_URI)
    /* const partner = await Partner.findOne({})
    partner.fechanacimiento = moment(new Date(fecha)).format('YYYY-MM-DD')
    await partner.save()
    console.log('partner modificado') */

    const usuarios = await Partner.find({})
    console.log('# Corrigiendo todos los usuarios')
    log('# Corrigiendo todos los usuarios')
    console.log(usuarios.length.toString())
    for (let index = 0; index < usuarios.length; index++) {
        const usuario = usuarios[index]
        try {
            const fecha = (!usuario.fechanacimiento || calcularEdad(usuario.fechanacimiento) > 100) ? '' : moment(new Date(usuario.fechanacimiento)).format('YYYY-MM-DD')
            // console.log(fecha, usuario.fechanacimiento, calcularEdad(usuario.fechanacimiento))
            usuario.fechanacimiento = fecha
            await usuario.save()
            await Partner.findOneAndUpdate({ _id: usuario._id }, { fechanacimiento: fecha })
        } catch (error) {
            console.log(' - La actualizacion del usuario ' + usuario._id + ' HA FALLADO, no se pudo actualizar: ' + error.message)
        }
    }
    console.log('**finalizo el formato de fecha de usuarios**')
    console.log('# Formateando fecha atenciones')
    log('# Formateando fecha atenciones')
    const atenciones = await Atencion.find({})
    for (let index = 0; index < atenciones.length; index++) {
        const atencion = atenciones[index]
        try {
            const fechaAtencion = (!atencion.fechaatencion) ? '' : moment(new Date(atencion.fechaatencion)).format('YYYY-MM-DD')
            const fechaCP = (!atencion.fechacosaspendientes) ? '' : moment(new Date(atencion.fechacosaspendientes)).format('YYYY-MM-DD')
            console.log('```\n' + JSON.stringify({ _id: atencion._id, fechaAtencion, fechaCP }) + '\n```')
            await Atencion.findOneAndUpdate({ _id: atencion._id }, {
                fechaatencion: fechaAtencion,
                fechacosaspendientes: fechaCP
            })
            console.log(' - Actualizado correctamente')
        } catch (error) {
            console.log('- HA FALLADO la actualización del documento', error.message)
        }
    }
    console.log('**formateadas todas las fechas de atenciones**')
    fsStream.close()
    mongoose.connection.close()

    /* const usuarios = await Partner.find({
        fechanacimiento: { $gte: '1971-10-16', $lte: '1978-05-16' }
    })
    for (let index = 0; index < usuarios.length; index++) {
        const usuario = usuarios[index]
        console.log(usuario.nombre + ' ' + moment(usuario.fechanacimiento).format('YYYY-MM-DD'))
    }
    console.log(usuarios.length) */

    /* const atenciones = await Atencion.find({
        fechaatencion: { $gte: '2021-09-1', $lte: '2021-09-29' }
    })
    for (let index = 0; index < atenciones.length; index++) {
        const usuario = atenciones[index]
        console.log(usuario.fechaatencion, moment(usuario.fechaatencion).format('YYYY-MM-DD'))
    }
    console.log(atenciones.length) */
}

function calcularEdad (fecha) {
    const hoy = new Date()
    const cumpleanos = new Date(fecha)
    let edad = hoy.getFullYear() - cumpleanos.getFullYear()
    const m = hoy.getMonth() - cumpleanos.getMonth()

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--
    }

    return edad
}
