import { createServer } from 'http'

import { createExpress } from './servers/express'
import { createIo } from './servers/io'
import { createClientSocket } from './__tests__/clientSocket'

const expressServer = createExpress()
const httpServer = createServer(expressServer)
export const ioServer = createIo(httpServer)

httpServer.listen(3333, () => {
  console.log('-- Server running --')
  createClientSocket('1')
  createClientSocket('5')
})
