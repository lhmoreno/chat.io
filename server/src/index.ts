import { createServer } from 'http'
import { connect } from 'mongoose'

import { createServerExpress } from './servers/express'
import { createServerSocketIo } from './servers/socketio'

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

console.log('INFO: MongoDB connecting...')

connect(`mongodb://${MONGO_ADMIN_USER}:${MONGO_ADMIN_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}?authSource=admin`)

  .then(() => {
    console.log('LOG: MongoDB connected')
    console.log('INFO: Starting server...')
    httpServer.listen(APP_PORT, () => {
      console.log(`LOG: Running in http://localhost:${APP_PORT}`)
    })
  })

  .catch((err) => {
    console.log('ERROR: MongoDB not connected')
    console.log(err)
  })
