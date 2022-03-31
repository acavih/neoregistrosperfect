import express from 'express'
import authRouter from './auth'
import partnerRouter from './partners'
import resourceRouter from './resource'
import attentionRouter from './attentions'

const apiRouter = express.Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/resources', resourceRouter)
apiRouter.use('/partners', partnerRouter)
apiRouter.use('/attentions', attentionRouter)

export default apiRouter
