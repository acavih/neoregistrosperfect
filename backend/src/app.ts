import express from 'express'
import cors from 'cors'
import apiRouter from './routes'
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/error'

const app = express()

app.use(cors({}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRouter)

app.get('/', (_req, res) => res.end('Hola mundo'))

app.use(boomErrorHandler)
app.use(logErrors)
app.use(errorHandler)

export default app
