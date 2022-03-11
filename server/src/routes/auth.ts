import { authenticateLocal, authorizeJwt } from './../utils/auth/index';
import express from 'express'
import userModel from '../models/User'
import boom from '@hapi/boom'
import { createPayload } from '../utils/jwt';

const authRouter = express.Router()

authRouter.post('/signup', async (req, res) => {
    const existingUser = await userModel.findOne({email: req.body.email})
    if (existingUser) {
        return res.json(boom.conflict())
    }
    const newUser = await userModel.create(req.body)

    const {password, ...payload} = newUser

    res.status(201).json({message: 'El usuario fue creado', payload})
})

authRouter.post('/signin', authenticateLocal, async (req, res) => {
    res.json({message: 'Has accedido correctamente', payload: createPayload({}, (req.user as any).email)})
})

authRouter.get('/profile', authorizeJwt, async (req, res) => {
    res.json({user: req.user})
})
authRouter.post('logout', authorizeJwt, async (req, res) => {
    res.json({})
})

export default authRouter