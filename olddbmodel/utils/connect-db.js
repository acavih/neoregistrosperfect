const mongoose = require('mongoose')
const { DB_URI } = require('../vars')

/**
 * @type {import('mongoose').ConnectionOptions}
 */
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}

module.exports.connectDB = connDB => new Promise((resolve, reject) => {
    const uriDB = connDB || DB_URI
    console.log('conectandose a ' + uriDB)
    mongoose.connect(uriDB, mongooseOptions, (err) => {
        if (err) {
            console.log(err)
            console.log('No se pudo conectar a la base de datos ' + uriDB)
            return reject(err)
        }
        console.log('Se ha podido conectar a la base datos correctamente ' + uriDB)
        resolve(mongoose.connection.db)
    })
})
