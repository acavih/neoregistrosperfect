import mongoose from 'mongoose'
import calcularEdad from '../utils/calcular-edad'
import { DEFAULT_NATIONALITY, DEFAULT_PARTNER, DEFAULT_RESIDENCY, DEFAULT_SEX } from '../vars'

const partnerSchema = new mongoose.Schema({
  code: { type: String, trim: true, required: false },
  name: { type: String, trim: true, required: false },
  surname: { type: String, trim: true, required: false },
  bornDate: { type: Date },
  sipCard: { type: String, trim: true, required: false },
  email: { type: String, trim: true, required: false },
  phone: { type: String, trim: true, required: false },
  observations: { type: String, trim: true, required: false },
  pendent: { type: String, trim: true, required: false },
  sex: { type: mongoose.Types.ObjectId, ref: 'resources', default: DEFAULT_SEX },
  partner: { type: mongoose.Types.ObjectId, ref: 'resources', default: DEFAULT_PARTNER },
  nationality: { type: mongoose.Types.ObjectId, ref: 'resources', default: DEFAULT_NATIONALITY },
  residency: { type: mongoose.Types.ObjectId, ref: 'resources', default: DEFAULT_RESIDENCY }
})

function returnAge (this: any) {
  return calcularEdad(this.fechanacimiento)
}

partnerSchema.virtual('edad')
  .get(returnAge)

partnerSchema.set('toObject', { virtuals: true })
partnerSchema.set('toJSON', { virtuals: true })

export const Partner = mongoose.model('partner', partnerSchema)

export default Partner
