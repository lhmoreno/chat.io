import { createServer } from 'http'
import { connect } from 'mongoose'

import { createExpress } from './servers/express'
import { createIo } from './servers/io'
// import { createClientSocket } from './__tests__/clientSocket'

const expressServer = createExpress()
const httpServer = createServer(expressServer)
export const ioServer = createIo(httpServer)

connect('mongodb://admin:123@localhost:27017/chatio?authSource=admin')
  .then(() => console.log('-- Database connected --'))
  .catch(() => console.log('!! Database not connected !!'))

httpServer.listen(3333, () => {
  console.log('-- Server running --')
  // createClientSocket()
})
