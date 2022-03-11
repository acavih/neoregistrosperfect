import 'dotenv/config'

export const URI_DB = process.env.URI_DB || 'mongodb://localhost/registros'
export const PORT = process.env.PORT_NUMBER || 8080
export const SALTS = Number(process.env.SALTS) || 8
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "s kmkskkmsdckmlsklscd"
export const TOKEN_ISSUER = process.env.TOKEN_ISSUER || 'registros'
export const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '2h'