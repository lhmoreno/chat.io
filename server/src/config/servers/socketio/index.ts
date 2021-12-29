import { Server } from 'http'
import { Server as ServerIo } from 'socket.io'

// import { auth } from '../../../middlewares/auth'
import { redis } from '../../databases/redis'

export function createServerSocketIo(server: Server) {
  const socketio = new ServerIo(server, {
    cors: {
      origin: '*'
    }
  })

  // socketio.use(auth.io)

  socketio.on('connection', async (socket) => {
    console.log('LOG: +1 User Io')
    redis.set(socket.handshake.user_id, socket.id)

    socket.on('disconnect', () => {
      console.log('LOG: -1 User Io')
      redis.del(socket.handshake.user_id)
    })
  })

  return socketio
}
