require('dotenv/config')
const mongoose = require('mongoose')
const { connectDB } = require('../../utils/connect-db')
const insertresources = require('./insertresources')

require('dotenv/config')

connectDB().then(async () => {
    const testConnection = mongoose.createConnection(process.env.DB_URI_TEST)
    console.log('conectado a base de datos de test', process.env.DB_URI_TEST)

    const MemberOld = require('../../models/Members')
    const AttentionOld = require('../../models/Atencion')
    const { resources } = require('../../models/Resource')

    const { Resource, Member, Attention } = require('./models')(testConnection)

    await insertresources(resources, Resource)

    const members = await MemberOld.find({})
        .populate('sexo')
        .populate('socioono')
        .populate('nacionalidad')
        .populate('ciudadresidencia')

    for (let index = 0; index < members.length; index++) {
        const member = JSON.parse(JSON.stringify(members[index]))
        const idMember = member._id
        delete member._id
        if (member.sexo) { member.sexo = await Resource.findOne({ type: 'sexo', name: member.sexo.name }) }
        if (member.socioono) { member.socioono = await Resource.findOne({ type: 'socioono', name: member.socioono.name }) }
        if (member.nacionalidad) { member.nacionalidad = await Resource.findOne({ type: 'nacionalidad', name: member.nacionalidad.name }) }
        if (member.ciudadresidencia) { member.ciudadresidencia = await Resource.findOne({ type: 'residencia', name: member.ciudadresidencia.name }) }

        console.log('SALVANDO MIEMBRO %s %s', member.nombre, member.apellidos)
        // guardar usuario
        const savedMember = await Member.create(member)

        const attentions = await AttentionOld.find({ user: idMember })
            .populate('tipoaenciones')
            .populate('Proyectos')
            .populate('motivosatencion')
            .populate('derivadoa')
            .populate('derivadode')
            .populate('formacion')
            .populate('voluntariado')

        console.log('Este usuario tiene %d atenciones', attentions.length)

        for (let index = 0; index < attentions.length; index++) {
            const attention = JSON.parse(JSON.stringify(attentions[index]))
            delete attention._id
            attention.tipoaenciones = await getResources('tipoatenciones', attention.tipoaenciones)
            attention.Proyectos = await getResources('proyectos', attention.Proyectos)
            attention.motivosatencion = await getResources('motivosatencion', attention.motivosatencion)
            attention.derivadoa = await getResources('derivaciones', attention.derivadoa)
            attention.derivadode = await getResources('derivaciones', attention.derivadode)
            attention.formacion = await getResources('formacion', attention.formacion)
            attention.voluntariado = await getResources('voluntariado', attention.voluntariado)
            member.user = savedMember

            console.log('guardando atencion numero %d', index)

            await Attention.create(attention)
        }
    }

    async function getResources (typeResource, arrayResources) {
        const resources = []
        for (let index = 0; index < arrayResources.length; index++) {
            const resource = arrayResources[index]
            if (resource === null) { continue }
            // console.log(resource)
            resources.push(await Resource.findOne({ type: typeResource, name: resource.name }))
        }
        return resources
    }
}).catch((e) => {
    console.log(e)
    console.log('Hubo un fallo')
}).finally(() => {
    console.log('El proceso ha acabado')
})
