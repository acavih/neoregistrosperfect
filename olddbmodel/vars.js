module.exports.PORT = process.env.PORT || 8080
module.exports.TOKEN_KEY = process.env.TOKEN_KEY || 'shhh'
module.exports.SALTS = Number(process.env.SALTS) || 8
module.exports.DB_URI = process.env.DB_URI || 'mongodb://localhost/acavihf'