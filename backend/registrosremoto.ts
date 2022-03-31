/* import fs from 'fs/promises'
import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb+srv://acavih:wAwEC6UbiIn1Cvmdyey4@cluster0.punxv.mongodb.net/')

async function main () {
  await client.connect()
  const db = await client.db('acavih')
  const collection = db.collection('resources')
  const resources = (await collection.find({}).toArray()).map((r) => {
    const { _id, __v, ...doc } = { ...r } as any
    doc.archived = doc.archived || false
    return doc
  })
  await fs.writeFile('resoruces.json', JSON.stringify(resources))
}

main()
*/
