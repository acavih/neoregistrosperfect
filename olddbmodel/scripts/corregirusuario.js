require('dotenv/config')
const bcrypt = require('bcrypt')
const Partner = require('../models/Members')
const resources = require('../models/Resource')
const Atencion = require('../models/Atencion')
const User = require('../models/User')
const { connectDB } = require('../utils/connect-db')
const { SALTS } = require('../vars')

connectDB().then(main)

/**
 *
 * @param {import('mongodb').Db} db
 */
async function main (db) {
    console.log('conectado a la base de datos')
}
