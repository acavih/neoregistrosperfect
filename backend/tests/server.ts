import supertest from 'supertest'
import app from '../src/app'
import {connectDb, closeConnection} from '../src/utils/connect-db'

const server = supertest(app)

async function main () {
    await connectDb()
    try {
        const userInfo = {
            name: 'Raul',
            surname: 'Contreras',
            email: 'alumno234@email.com',
            password: 'alumno',
        }
        const {name, surname, ...loginData} = userInfo
        // const response = await server.post('/api/auth/signup').send(userInfo)
        const response = await server.post('/api/auth/signin').send(loginData)
        console.log(response)
        await closeConnection()
    } catch (error) {
        console.log(error)
    }

}

main()