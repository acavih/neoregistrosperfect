import boom from '@hapi/boom'
import { Strategy } from 'passport-local'
import userModel from '../../models/User'
import { verifyPassword } from '../hash'

const localStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, async (email, password, done) => {
  console.log('AUTENTICANDO', email)
  const user = await userModel.findOne({ email }).select('-_id')
  const userExists = user !== null
  const passwordIsCorrect = userExists && await verifyPassword(password, user.password)

  console.log(user)

  if (!userExists || !passwordIsCorrect) {
    done(boom.unauthorized(), false)
  } else {
    console.log('CORRECTO', user.email)
    done(null, user._doc)
  }
})

export default localStrategy
