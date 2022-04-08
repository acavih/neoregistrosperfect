import { Router } from 'express'
import Partner from '../models/Partner'
import { DEFAULT_NATIONALITY, DEFAULT_PARTNER, DEFAULT_RESIDENCY, DEFAULT_SEX } from '../vars'

export const partnerRouter = Router()

partnerRouter.get('/', async (req, res) => {
  const limit = Number(req.query.limit || 10)
  const page = Number(req.query.page || 1)
  const skip = (page - 1) * limit

  const query = {} as any

  if (req.query.q) {
    query.code = { $regex: req.query.q }
  }

  const partners = await Partner.find(query).limit(limit).skip(skip)
  const count = await Partner.countDocuments(query)

  res.status(200).json({
    payload: {
      items: partners,
      count
    }
  })
})

partnerRouter.post('/', (req, _res, next) => {
  if (req.body.sex === {}) { req.body.sex = DEFAULT_SEX }
  if (req.body.nationality === {}) { req.body.sex = DEFAULT_NATIONALITY }
  if (req.body.partner === {}) { req.body.sex = DEFAULT_PARTNER }
  if (req.body.residency === {}) { req.body.sex = DEFAULT_RESIDENCY }
  next()
}, async (req, res) => {
  console.log(req.body)
  const partner = await Partner.create(req.body)
  res.json({ message: 'El miembro se introdujo con éxito', payload: partner })
})

partnerRouter.get('/:partner', async (req, res) => {
  const populate = (req.query.populate ?? '').toString()
  const partner = await Partner.findOne({ _id: req.params.partner }).populate(populate)
  res.json({ message: 'Información del elemento', payload: partner })
})

partnerRouter.put('/:partner', async (req, res) => {
  const partner = await Partner.findOneAndUpdate({ _id: req.params.partner }, req.body, { new: true })
  res.json({ message: 'El miembro se actualizó con éxito', payload: partner })
})

export default partnerRouter
