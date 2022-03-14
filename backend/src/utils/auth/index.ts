import passport from 'passport'
import jwtStrategy from './strategy.jwt'
import localStrategy from './strategy.local'

passport.use(localStrategy)
passport.use(jwtStrategy)

passport.serializeUser((user, done) => {
    done(null, user)
})

export const authenticateLocal = passport.authenticate('local')
export const authorizeJwt = passport.authenticate('jwt')