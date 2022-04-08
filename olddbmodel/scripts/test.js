const moment = require('moment')
moment.locale('es')

const d = moment('2021-08-23')

console.log(d.format('LL'))
