require('dotenv/config')
const ObjectId = require('mongoose').Types.ObjectId
const Atencion = require('../models/Atencion')
const Partner = require('../models/Members')
const { connectDB } = require('../utils/connect-db')

connectDB().then(async () => {
    const atenciones = await Atencion.find({ derivadoa: '61448e652239c552d8291d75' })
    console.log(atenciones)

    // const atenciones = await Atencion.find({})

    /* const ids = atenciones.map(a => ObjectId(a.user))
    const partners = await Partner.find({ _id: { $nin: ids } })
    console.log(partners.length)
    /* const q = {
    }
    q.Proyectos = { $in: [ObjectId('60faa328222e765e5e423a54')] }
    const atenciones = await Atencion.find(q).sort([['fechaatencion', -1]]).limit(50)

    console.log(atenciones) */
    /* const atencionesActualizadas = 0
    const atenciones = await Atencion.find({
        $or: [
            { cosaspendientes: { $nin: [null, ''] } }
        ]
    }).sort('-fechacosaspendientes').limit(200)

    console.log(atenciones) */
    /* for (let index = 0; index < atenciones.length; index++) {
        const atencion = atenciones[index]
        if (atencion.fechaatencion) {
            const fecha = Number(atencion.fechaatencion)
            atencion.fechaatencion = fecha
            await atencion.save()
            atencionesActualizadas += 1
        }
    }

    console.log(atencionesActualizadas) */
})
