require('dotenv/config')
const mongodb = require('mongodb')

const url = process.env.DB_URI

const client = new mongodb.MongoClient(url)

const data = {}

client.connect().then(async () => {
    console.log('conectado')
    try {
        const d = new Date()
        const nameFile = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}.json`
        const db = await client.db('myFirstDatabase')
        const collections = await db.collections()

        for (let index = 0; index < collections.length; index++) {
            const collection = collections[index]
            const nameColl = collection.collectionName
            data[nameColl] = await (await collection.find({})).toArray()
        }

        require('fs').writeFileSync('./copydb/' + nameFile, JSON.stringify(data))
        console.log('Todos los datos copiados')
    } catch (error) {
        console.log(error)
    }
}).catch((err) => {
    console.log(err)
    console.log('Ocurrio un erro conectandose')
})
