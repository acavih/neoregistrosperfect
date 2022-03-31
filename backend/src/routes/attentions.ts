import express from 'express'
import Attention from '../models/Attention'

const router = express()

router.get('/', async (req, res) => {
  const sortConfig = [
    ['dateAttention', -1]
  ]
  const populate = (req.query.populate ?? '').toString()
  if (!req.query.user) {
    const attentions = await Attention.find({}).limit(10).sort(sortConfig).populate(populate)
    res.json({ message: 'Listado de atenciones', payload: attentions })
  } else {
    const attentions = await Attention.find({ partner: req.query.user }).sort(sortConfig).populate(populate)
    res.json({ message: 'Listado de atenciones', payload: attentions })
  }
})

export default router