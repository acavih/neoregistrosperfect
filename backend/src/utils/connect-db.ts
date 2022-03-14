import mongoose from 'mongoose'
import { URI_DB } from './../vars'

export async function connectDb () {
  console.log(`Intentando conectar a la base de datos ${URI_DB}`)
  await mongoose.connect(URI_DB, {})
  console.log('Conexión realizada correctamente')
}

export async function closeConnection () {
  await mongoose.connection.close()
}
