require('dotenv/config')
const mongoose = require('mongoose')
const Resource = require('../models/Resource')
const Member = require('../models/Members')
const Atencion = require('../models/Atencion')
const User = require('../models/User')
const DB_URI = process.env.DB_URI

mongoose.connect(DB_URI).then(async () => {
    console.log('Conexión a base de datos ' + DB_URI)
    const data = require('../copydb/copy2021121.json copy 2.json')

    const listResources = [
        'sexos', 'voluntariados', 'nacionalidads', 'formacions',
        'lugaratencions', 'tipoatenciones', 'derivaciones',
        'motivosatencions', 'proyectos', 'residencias', 'socioonos'
    ]

    // const listNotResources = ['users', 'atencions', 'partners']

    console.log(Object.keys(data))
    const resourcesItems = []

    for (let index = 0; index < listResources.length; index++) {
        const typeResource = listResources[index];
        const itemsMapped = data[typeResource].map(a => {
            return {...a, type: typeResource}
        })
        itemsMapped.forEach(a => resourcesItems.push(a))
    }
    await Resource.insertMany(resourcesItems)

    const members = data.partners
    const attentions = data.atencions

    const findInResources = (key, id) => {
        return data[key].filter(a => a._id === id)[0]
    }
    
    for (let index = 0; index < members.length; index++) {
        const member = members[index]
        const idMember = member._id
        delete member._id
        console.log('(%d/%d) SALVANDO MIEMBRO %s %s', index, members.length - 1, member.nombre, member.apellidos)
        if (member.sexo) { member.sexo = await Resource.findOne({ type: 'sexos', name: findInResources('sexos', member.sexo).name }) }
        if (member.socioono) { member.socioono = await Resource.findOne({ type: 'socioonos', name: findInResources('socioonos', member.socioono).name }) }
        if (member.nacionalidad) { member.nacionalidad = await Resource.findOne({ type: 'nacionalidads', name: findInResources('nacionalidads', member.nacionalidad).name }) }
        if (member.ciudadresidencia) { member.ciudadresidencia = await Resource.findOne({ type: 'residencias', name: findInResources('residencias', member.ciudadresidencia).name }) }

        // guardar usuario
        const savedMember = await Member.create(member)

        const userAttentions = attentions.filter(attention => attention.user === idMember)

        /* const attentions = await AttentionOld.find({ user: idMember })
            .populate('tipoaenciones')
            .populate('Proyectos')
            .populate('motivosatencion')
            .populate('derivadoa')
            .populate('derivadode')
            .populate('formacion')
            .populate('voluntariado') */

        console.log('Este usuario tiene %d atenciones', userAttentions.length)

        for (let index = 0; index < userAttentions.length; index++) {
            const attention = JSON.parse(JSON.stringify(userAttentions[index]))
            delete attention._id
            attention.tipoaenciones = await getResources('tipoatenciones', attention.tipoaenciones)
            attention.Proyectos = await getResources('proyectos', attention.Proyectos)
            attention.motivosatencion = await getResources('motivosatencions', attention.motivosatencion)
            attention.derivadoa = await getResources('derivaciones', attention.derivadoa)
            attention.derivadode = await getResources('derivaciones', attention.derivadode)
            attention.formacion = await getResources('formacions', attention.formacion)
            attention.voluntariado = await getResources('voluntariados', attention.voluntariado)
            attention.user = savedMember

            console.log('guardando atencion numero %d', index)

            await Atencion.create(attention)
        }
    }

    async function getResources (typeResource, arrayResources) {
        const resources = []
        if (!arrayResources) return []
        for (let index = 0; index < arrayResources.length; index++) {
            const resource = arrayResources[index]
            if (resource === null) { continue }
            // console.log(resource)
            resources.push(await Resource.findOne({ type: typeResource, name: findInResources(typeResource, resource).name }))
        }
        return resources
    }

    /*for (const collection in data) {
        if (Object.hasOwnProperty.call(data, collection)) {
            const allrows = data[collection]
            const CurrentModel = models[collection].find ? models[collection] : models[collection].model
            await CurrentModel.insertMany(allrows)
        }
    }
    // require('fs').writeFileSync('./copydb/copy.json', JSON.stringify(data))
    console.log('Todos los datos copiados')*/
}).catch((err) => {
    console.log(err)
    console.log('No se pudo conectar a la base de datos')
}).finally(() => {
    console.log('finalizo toda la restauración')
})
