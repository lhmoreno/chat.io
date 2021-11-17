import { Server } from 'http'
import { Server as ServerIo } from 'socket.io'
import { clients } from '../database' // Trash

import { auth } from '../middlewares/auth'

interface SEND_MESSAGE {
  user_id: string
  text: string
}

export function createIo(server: Server) {
  const io = new ServerIo(server)

  io.use(auth.io)
  io.on('connection', (socket) => {
    const user_id = socket.handshake.user_id as string
    clients[user_id] = socket.id
    console.log('+1 User')

    socket.on('disconnect', () => {
      delete clients[user_id]
      console.log('-1 User')
    })

    socket.on('SEND_MESSAGE', (message: SEND_MESSAGE) => {
      const send_socket_id = clients[message.user_id]
      if (send_socket_id) {
        const isSend = socket.to(send_socket_id).emit('MESSAGE', { ...message, hour: '12:32am' })
        if (!isSend) console.log('Message not send')
      }
    })
  })

  return io
}
