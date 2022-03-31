import http from 'http'
import app from './app'
import { createUserIfNotExists } from './models/User'
import { connectDb } from './utils/connect-db'
import { PORT } from './vars'
/* import Attention from './models/Attention'
import Partner from './models/Partner' */

async function main () {
  await connectDb()
  console.log('Arrancando aplicación')
  const server = http.createServer(app)

  /* const member = await Partner.findOne().populate('sex')
  const attention = await Attention.find({ partner: member }).populate('attentionsTypes projects')
  console.log(attention) */

  server.listen(PORT, async () => {
    console.log(`Servidor escuchando en la direccion http://localhost:${PORT}`)
    await createUserIfNotExists('sarmancoder@email.com', 'alumno', 'Raul', 'Contreras')
  })
}

main()
