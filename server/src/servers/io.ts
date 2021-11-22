import { Server } from 'http'
import { Server as ServerIo } from 'socket.io'
import { clients } from '../database' // Trash

import { auth } from '../middlewares/auth'
import { ChatService } from '../services/ChatService'

interface SEND_MESSAGE {
  user_id: string
  text: string
}

export function createIo(server: Server) {
  const io = new ServerIo(server, {
    cors: {
      origin: '*'
    }
  })

  io.use(auth.io)

  io.on('connection', (socket) => {
    const user_id = socket.handshake.user_id as string
    clients[user_id] = socket.id
    console.log('+1 User') // Log

    socket.on('disconnect', () => {
      delete clients[user_id]
      console.log('-1 User') // Log
    })

    socket.on('SEND_MESSAGE', async (message: SEND_MESSAGE) => {
      const messageSave = await ChatService.createMessage({ 
        users: [user_id, message.user_id], 
        message: {
          ...message,
          hour: '12:37am'
        }
      })
      socket.to(message.user_id).emit('GET_MESSAGE', messageSave)
    })
  })

  return io
}
