import express from 'express'
import Resource from '../models/Resource'
import { authorizeJwt } from '../utils/auth'

const resourceRouter = express.Router()

resourceRouter.use(authorizeJwt)

resourceRouter.get('/', async (req, res) => {
  const scope = req.query.scope || 'items'
  const { typeResource } = req.query

  if (scope === 'types') {
    const types = await Resource.find().distinct('type')
    res.json({
      message: 'Tipos de recursos',
      payload: types
    })
  } else {
    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.page) || 1
    const query = {} as any
    if (typeResource) {
      query.type = typeResource
    }
    const queryPromise = Resource.find(query)
    if (!req.query.paginate !== false) {
      queryPromise.limit(limit).skip(limit * (page - 1))
    }
    const resources = await queryPromise
    const itemsCount = await Resource.countDocuments(query)
    res.json({
      message: 'Listado de recursos',
      payload: resources,
      itemsCount
    })
  }
})

resourceRouter.post('/', async (req, res) => {
  const resource = await Resource.create(req.body)
  res.json({
    message: 'Recurso creado',
    payload: resource
  })
})

resourceRouter.put('/:id', async (req, res) => {
  const id = (req.params as any).id
  await Resource.updateOne({ _id: id }, {
    $set: req.body
  }, { new: true })
  const resourceUpdated = await Resource.findOne({ _id: id })
  console.log(resourceUpdated)
  return res.json({
    message: 'Recurso actualizado',
    payload: resourceUpdated._doc
  })
})

export default resourceRouter
