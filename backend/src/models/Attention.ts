import mongoose from 'mongoose'

const attentionSchema = new mongoose.Schema({
  attentionsTypes: [{ type: mongoose.Types.ObjectId, ref: 'resources' }],
  projects: [{ type: mongoose.Types.ObjectId, ref: 'resources' }],
  attentionReasons: [{ type: mongoose.Types.ObjectId, ref: 'resources' }],
  derivedTo: [{ type: mongoose.Types.ObjectId, ref: 'resources' }],
  derivedFrom: [{ type: mongoose.Types.ObjectId, ref: 'resources' }],
  formation: [{ type: mongoose.Types.ObjectId, ref: 'resources' }],
  volunteer: [{ type: mongoose.Types.ObjectId, ref: 'resources' }],
  placeAttention: { type: mongoose.Types.ObjectId, ref: 'resources' },
  partner: { type: mongoose.Types.ObjectId, ref: 'partner' },
  pendent: { type: String, required: false, trim: true },
  archived: { type: Boolean, default: false },
  comment: { type: String, required: false, trim: true },
  dateAttention: { type: Date },
  datePendent: { type: Date, required: false }
})

const Attention = mongoose.model('attentions', attentionSchema)

export default Attention
