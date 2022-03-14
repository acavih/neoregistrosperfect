import { SALTS } from './../vars';
import bcrypt from 'bcrypt'

export async function hashPassword (password: string) {
    return await bcrypt.hash(password, SALTS)
}

export async function verifyPassword (password: string, hash: string) {
    return await bcrypt.compare(password, hash)
}