import Partner from '../models/Partner'
import Attention from '../models/Attention'
import Resource from '../models/Resource'
import { connectDb } from '../utils/connect-db'
async function main () {
  await connectDb()
  const member = await Partner.findOne().populate('sex')
  console.log(member)
}

main()
