import mongoose from 'mongoose'
import { hashPassword } from '../utils/hash'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

UserSchema.pre('save', async function cryptPassword () {
  if (this.isNew || this.isModified('password')) {
    this.set('password', await hashPassword(this.get('password')))
  }
})

const userModel = mongoose.model('users', UserSchema)

export default userModel

export async function createUserIfNotExists (username: string, password: string, name: string, surname: string) {
  const user = await userModel.findOne({ email: username })
  if (!user) {
    console.log('creando usuario %s', username)
    await userModel.create({ email: username, password, name, surname })
  }
}
