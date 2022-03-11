import { TOKEN_SECRET } from './../../vars';
import { Strategy, ExtractJwt } from "passport-jwt";
import userModel from '../../models/User';

const jwtStrategy = new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: TOKEN_SECRET
}, async (jwt_payload, done) => {
    try {
        const user = await userModel.findOne({email: jwt_payload.sub})
        if (user) {
            const {password, _id, __v, ...userInfo} = user._doc
            done(null, userInfo)
        } else {
            done(null, false)
        }
    } catch (error) {
        done(error, false)
    }
})

export default jwtStrategy