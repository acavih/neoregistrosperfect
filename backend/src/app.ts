import express from 'express'
import apiRouter from './routes'
import cors from 'cors'

const app = express()

app.use(cors({}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', apiRouter)

app.get('/', (req, res) => res.end('Hola mundo'))

export default app