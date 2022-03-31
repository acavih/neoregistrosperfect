import Resource from '../models/Resource'
import Partner from '../models/Partner'
import Attention from '../models/Attention'
import { connectDb } from '../utils/connect-db'

const data = require('./data.json')

async function main () {
  await connectDb()
  console.log('El volcado va a empezar ya')
  for (let memberIndex = 0; memberIndex < data.length; memberIndex++) {
    const m = data[memberIndex]
    const { attentions, ...partner } = m
    console.log(`Metiendo miembro (${partner.code}) - ${partner.name} ${partner.surname} (${memberIndex + 1}/${data.length})`)
    const partnerPersisted = await Partner.create({
      ...partner,
      sex: await mapStringsToResources(partner.sex),
      partner: await mapStringsToResources(partner.partner),
      nationality: await mapStringsToResources(partner.nationality),
      residency: await mapStringsToResources(partner.residency)
    })
    // await sleep(500)
    console.log('Metiendo atenciones %d', attentions.length)
    for (let attentionIndex = 0; attentionIndex < attentions.length; attentionIndex++) {
      const attention = attentions[attentionIndex]
      console.log(' - Metiendo atencion %d de %d', attentionIndex + 1, attentions.length)
      await Attention.create({
        ...attentions[attentionIndex],
        attentionsTypes: await mapStringsToResources(attention.attentionsTypes),
        projects: await mapStringsToResources(attention.projects),
        attentionReasons: await mapStringsToResources(attention.attentionReasons),
        derivedTo: await mapStringsToResources(attention.derivedTo),
        derivedFrom: await mapStringsToResources(attention.derivedFrom),
        formation: await mapStringsToResources(attention.formation),
        volunteer: await mapStringsToResources(attention.volunteer),
        placeAttention: await mapStringsToResources(attention.placeAttention),
        partner: partnerPersisted
      })
      // console.log(attention)
      // await sleep(500)
    }
  }
}

main()

/* function sleep (ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, ms)
  })
} */

async function createOrFindResource (name: String, type: String) {
  const resource = await Resource.findOne({ type, name })
  if (resource) { return resource }
  return await Resource.create({ name, type })
}

async function mapStringsToResources (a: any) {
  if (!a) { return a }
  if (a.map) {
    return await Promise.all(a.map(async (r: string) => {
      const [name, type] = r.split(':')
      return await createOrFindResource(name, type)
    }))
  } else {
    const [name, type] = a.split(':')
    return await createOrFindResource(name, type)
  }
}
