import 'dotenv/config'

export const URI_DB = process.env.URI_DB || 'mongodb://192.168.0.43/registros'
export const PORT = process.env.PORT_NUMBER || 8080
export const SALTS = Number(process.env.SALTS) || 8
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 's kmkskkmsdckmlsklscd'
export const TOKEN_ISSUER = process.env.TOKEN_ISSUER || 'registros'
export const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '2h'
export const DEFAULT_SEX = process.env.DEFAULT_SEX || '6244553d594cdbf3f041b96a'
export const DEFAULT_PARTNER = process.env.DEFAULT_PARTNER || '62445539594cdbf3f041acd2'
export const DEFAULT_NATIONALITY = process.env.DEFAULT_NATIONALITY || '62445539594cdbf3f041ad0f'
export const DEFAULT_RESIDENCY = process.env.DEFAULT_RESIDENCY || '62445539594cdbf3f041ad12'
