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
    console.log('Conectado correctamente')
    /* const member = await Partner.create({
        codigo: '654789856',
        nombre: 'Usuario',
        apellidos: 'no valido',
    })

    console.log(member) */
    const remove = await Partner.findOneAndRemove({ _id: '61237df4c4f31f55ec2bc544' })
    console.log(remove)
})
