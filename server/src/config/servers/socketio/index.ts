import { Server } from 'http'
import { Server as ServerIo } from 'socket.io'

export function createServerSocketIo(server: Server) {
  const socketio = new ServerIo(server, {
    cors: {
      origin: '*'
    }
  })

  socketio.on('connection', (socket) => {
    console.log('LOG: +1 User Io')

    socket.on('disconnect', () => {
      console.log('LOG: -1 User Io')
    })
  })

  return socketio
}
