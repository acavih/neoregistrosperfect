import { TOKEN_SECRET, TOKEN_ISSUER, TOKEN_EXPIRES_IN } from './../vars';
import jwt from 'jsonwebtoken'

const options: jwt.SignOptions = {
    issuer: TOKEN_ISSUER,
    expiresIn: TOKEN_EXPIRES_IN
}

export function createPayload (payload: any, subject: string) {
    return jwt.sign(payload, TOKEN_SECRET, {...options, subject})
}
