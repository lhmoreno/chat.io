import { Request, Response } from 'express'

import { utils } from '../validators/utils'
import { UserService } from '../services/UserService'
import { ChatService } from '../services/ChatService'
import { ChatView } from '../views/ChatView'

function formatAMPM (date: Date) {
  let hours = date.getUTCHours() - 3
  const minutes = date.getUTCMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'

  hours = hours % 12
  hours = hours ? hours : 12
  const strMinutes = minutes.toString().padStart(2, '0')
  const strTime = hours + ':' + strMinutes + ' ' + ampm

  return strTime
}

async function createMessage(req: Request, res: Response) {
  const token = req.headers.authorization
  const { user_id_2 } = req.params
  const { message: message_send } = req.body

  // Validators
  if (typeof(token) !== 'string') return res.status(401).json({ error: 'Token is a requirement' })
  if (typeof(message_send) !== 'string') return res.status(400).json({ error: 'Invalid message' })

  try {
    // Services
    const user_id_1 = await UserService.findUserIdByToken(token.split(' ')[1])
    const date = new Date()
    const newMessage = await ChatService.createMessageByUsersIds(user_id_1, user_id_2, {
      user_id: user_id_1,
      text: message_send,
      hour: formatAMPM(date)
    })

    const message = ChatView.renderMessage(newMessage)

    return res.status(201).json({ message })
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
    const messages_db = await ChatService.findMessagesByUsersIds(user_id_1, user_id_2)

    const messages = ChatView.renderManyMessages(messages_db)

    return res.status(200).json({ messages })
  } catch (err) {
    if (utils.isServiceError(err)) {
      err.message_server && console.log(err.message_server)
      return res.status(err.status).json({ error: err.error })
    }
    
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const ChatController = { createMessage, indexMessages }
