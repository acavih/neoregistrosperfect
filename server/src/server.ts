import http from 'http'
import app from './app'
import { connectDb } from './utils/connect-db'
import { PORT } from './vars'


async function main () {
    await connectDb()
    console.log('Arrancando aplicación')
    const server = http.createServer(app)
    
    server.listen(PORT, () => {
        console.log(`Servidor escuchando en la direccion http://localhost:${PORT}`)
    })
}

main()