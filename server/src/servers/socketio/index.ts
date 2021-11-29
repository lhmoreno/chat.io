import { Server } from 'http'
import { Server as ServerIo } from 'socket.io'

export function createServerSocketIo(server: Server) {
  const socketio = new ServerIo(server, {
    cors: {
      origin: '*'
    }
  })

  socketio.on('connection', (socket) => {
    console.log('+1 User') // Log

    socket.on('disconnect', () => {
      console.log('-1 User') // Log
    })
  })

  return socketio
}
