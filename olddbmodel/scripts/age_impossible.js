require('dotenv/config')
const Partner = require('../models/Members')
const { connectDB } = require('../utils/connect-db')

/*
const sexoNSNC = '60faa328222e765e5e423a52'
const socioonoNSNC = '60faa327222e765e5e423a42'
const residenciaNSNC = '60faa323222e765e5e423a08'
const nacionalidadNSNC = '60faa321222e765e5e4239e0'
*/

connectDB().then(async () => {
    const partners = await Partner.find({}).populate('sexo').limit(5)
    console.log(partners)

    /* const members = await Partner.find({}).select('codigo nombre apellidos fechanacimiento')
    const memberswithage = members.map((m) => {
        m.edad = calcularEdad(new Date(m.fechanacimiento))
        return m
    }).filter(m => m.edad > 70).map((m) => {
        const { codigo, _id, nombre, apellidos, edad } = m
        return `${_id};${codigo};${nombre};${apellidos};${edad}`
    })
    const fs = require('fs')
    fs.writeFileSync('members.csv', memberswithage.join('\n'))
    console.log('fichero escrito (' + memberswithage.length + ' resultados)') */
})

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
