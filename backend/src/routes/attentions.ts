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

router.post('/', async (req, res) => {
  console.log(req.body)
  const attention = new Attention({
    ...req.body,
    partner: req.query.partner
  })
  await attention.save()
  res.json({ message: 'Atención creada', payload: attention })
})

router.get('/:id', async (req, res) => {
  const attention = await Attention.findById(req.params.id)
  res.json({ message: 'Atención encontrada', payload: attention })
})

router.put('/:attention', async (req, res) => {
  const populate = (req.query.populate ?? '').toString()
  console.log(populate)
  const attention = await Attention.findByIdAndUpdate(req.params.attention, req.body).populate(populate)
  res.json({ message: 'Atencion actualizada', payload: attention })
})

export default router
