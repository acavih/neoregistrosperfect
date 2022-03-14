import express from 'express'
import boom from '@hapi/boom'
import userModel from '../models/User'
import { createPayload } from '../utils/jwt'
import { authenticateLocal, authorizeJwt } from './../utils/auth/index'

const authRouter = express.Router()

authRouter.post('/signup', async (req, res) => {
  const existingUser = await userModel.findOne({ email: req.body.email })
  if (existingUser) {
    return res.json(boom.conflict())
  }
  const newUser = await userModel.create(req.body)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, _id, __v, ...payload } = newUser._doc

  res.status(201).json({ message: 'El usuario fue creado', payload })
})

authRouter.post('/signin', authenticateLocal, (req, res) => {
  res.json({ message: 'Has accedido correctamente', payload: createPayload({}, (req.user as any).email) })
})

authRouter.get('/profile', authorizeJwt, (req, res) => {
  res.json({ user: req.user })
})
authRouter.post('/logout', (_req, res) => {
  res.json({})
})

export default authRouter
