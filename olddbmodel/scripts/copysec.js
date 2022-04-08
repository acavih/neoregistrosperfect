const path = require('path')
const pathEnv = path.resolve(__dirname, '..', '.env')
console.log(pathEnv)
require('dotenv').config({
    path: pathEnv
})
const mongoose = require('mongoose')
const Resources = require('../models/Resource')
const Member = require('../models/Members')
const Atencion = require('../models/Atencion')
const User = require('../models/User')
console.log(process.env)
const DB_URI = process.env.DB_URI

/**
 * @type {Object.<string, mongoose.Mongoose.model>}
 */
const models = {
    partners: Member,
    atencions: Atencion,
    users: User
}

const data = {}

mongoose.connect(DB_URI, require('./mongoconfig').config).then(async () => {
    console.log('===========')
    console.log('HACIENDO COPIA DE SEGURIDAD DE ' + DB_URI)
    console.log('===========')
    // const collections = await (await mongoose.connection.db.listCollections()).toArray()
    const d = new Date()
    const nameFile = `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}.json`
    /* for (const model in models) {
        if (Object.hasOwnProperty.call(models, model)) {
            const collName = collections[model].name
            const CurrentModel = models[collName].find ? models[collName] : models[collName].model
            data[collName] = await CurrentModel.find({})
        }
    } */
    data.resources = await Resources.find({})
    data.members = await Member.find({})
    data.attentions = await Atencion.find({})
    data.users = await User.find({})
    require('fs').writeFileSync('./copydb/copy' + nameFile + '.json', JSON.stringify(data))
    console.log('Todos los datos copiados')
    mongoose.connection.close()
}).catch((err) => {
    console.log(err)
    console.log('No se pudo conectar a la base de datos')
})
