require('dotenv/config')
const Partner = require('../models/Members')
const Atention = require('../models/Atencion')
const { connectDB } = require('../utils/connect-db')

const DB_URI = process.env.DB_URI_REMOTE
// const DB_URI = process.env.DB_URI_LOCAL

const sexoNSNC = '60faa328222e765e5e423a52'
const socioonoNSNC = '60faa327222e765e5e423a42'
const residenciaNSNC = '60faa323222e765e5e423a08'
const nacionalidadNSNC = '60faa321222e765e5e4239e0'

connectDB(DB_URI).then(async () => {
    /* const atenciones = await Atention.updateMany({ cosaspendientes: '.' }, {
        $set: { cosaspendientes: '' }
    }) */
    // console.log(atenciones)
    /* const usuario = await Partner.find({ codigo: '620340918' })

    console.log(usuario) */
    console.log('Conectado correctamente')

    const membersSinSexo = await Partner.find({ sexo: null })
    console.log('Cantidad de miembros sin sexo: ' + membersSinSexo.length)
    for (let index = 0; index < membersSinSexo.length; index++) {
        const member = membersSinSexo[index]
        member.sexo = sexoNSNC
        await member.save()
    }

    const membersSinSocioono = await Partner.find({ socioono: null })
    console.log('Cantidad de miembros sin socioono: ' + membersSinSocioono.length)
    for (let index = 0; index < membersSinSocioono.length; index++) {
        const member = membersSinSocioono[index]
        member.socioono = socioonoNSNC
        await member.save()
    }

    const membersSinResidencia = await Partner.find({ ciudadresidencia: null })
    console.log('Cantidad de miembros sin residencia: ' + membersSinResidencia.length)
    for (let index = 0; index < membersSinResidencia.length; index++) {
        const member = membersSinResidencia[index]
        member.ciudadresidencia = residenciaNSNC
        await member.save()
    }

    const membersSinNacionalidad = await Partner.find({ nacionalidad: null })
    console.log('Cantidad de miembros sin nacionalidad: ' + membersSinNacionalidad.length)
    for (let index = 0; index < membersSinNacionalidad.length; index++) {
        const member = membersSinNacionalidad[index]
        member.nacionalidad = nacionalidadNSNC
        await member.save()
    }
    console.log('Terminó el script')
})
