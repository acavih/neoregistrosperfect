const mongoose = require('mongoose')
const createResources = namesResources => namesResources.map((name) => {
    const schema = new mongoose.Schema({
        name: { type: String }
    })

    const Model = mongoose.model(name, schema)

    return { name, model: Model }
})

const resourcesNames = 'derivaciones,nacionalidad,residencia,sexo,socioono,tipoatenciones,proyectos,motivosatencion,formacion,voluntariado,lugaratencion'

console.log(resourcesNames)

const resources = createResources(resourcesNames.split(','))

module.exports.resources = resources
module.exports.getResoruce = function (name) {
    return resources.filter(r => r.name === name)[0]
}
