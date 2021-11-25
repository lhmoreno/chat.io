import { Request, Response } from 'express'

import { utils } from '../validators/utils'
import { UserService } from '../services/UserService'
import { ChatService } from '../services/ChatService'

async function createMessage(req: Request, res: Response) {
  const token = req.headers.authorization
  const { user_id_2 } = req.params
  const { message } = req.body

  // Validators
  if (typeof(token) !== 'string') return res.status(401).json({ error: 'Token is a requirement' })
  if (typeof(message) !== 'string') return res.status(400).json({ error: 'Invalid message' })

  try {
    // Services
    const user_id_1 = await UserService.findUserIdByToken(token.split(' ')[1])
    const newMessage = await ChatService.createMessageByUsersIds(user_id_1, user_id_2, {
      user_id: user_id_1,
      text: message,
      hour: '12:37pm'
    })

    return res.status(201).json({ message: newMessage })
  } catch (err) {
    if (utils.isServiceError(err)) {
      err.message_server && console.log(err.message_server)
      return res.status(err.status).json({ error: err.error })
    }
    
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function indexMessages(req: Request, res: Response) {
  const token = req.headers.authorization
  const { user_id_2 } = req.params

  // Validators
  if (typeof(token) !== 'string') return res.status(401).json({ error: 'Token is a requirement' })

  try {
    // Services
    const user_id_1 = await UserService.findUserIdByToken(token.split(' ')[1])
    const messages = await ChatService.findMessagesByUsersIds(user_id_1, user_id_2)

    return res.status(201).json({ messages })
  } catch (err) {
    if (utils.isServiceError(err)) {
      err.message_server && console.log(err.message_server)
      return res.status(err.status).json({ error: err.error })
    }
    
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const ChatController = { createMessage, indexMessages }
