import { createServer } from 'http'

import { createServerExpress } from './config/servers/express'
import { createServerSocketIo } from './config/servers/socketio'

import { connectMongo } from './config/databases/mongo'
import './config/databases/redis'

const { 
  APP_PORT,
  MONGO_ADMIN_USER,
  MONGO_ADMIN_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_NAME
} = process.env

const serverExpress = createServerExpress()
const httpServer = createServer(serverExpress)
export const ioServer = createServerSocketIo(httpServer)

connectMongo({
  user: MONGO_ADMIN_USER,
  password: MONGO_ADMIN_PASSWORD,
  host: MONGO_HOST,
  port: MONGO_PORT,
  name: MONGO_NAME
})
  .then(() => {
    console.log('LOG: MongoDB connected')
    httpServer.listen(APP_PORT, () => {
      console.log(`LOG: Running in http://localhost:${APP_PORT}`)
    })
  })

  .catch((err) => {
    console.log('ERROR: MongoDB not connected')
    console.log(err)
  })
