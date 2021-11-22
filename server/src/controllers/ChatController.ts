import { Request, Response } from 'express'
import { isServiceError } from '../@types/VerifyType'

import { ChatService } from '../services/ChatService'

async function show(req: Request, res: Response) {
  const user_id_1 = req.user_id as string
  const user_id_2 = req.params.id

  try {
    const chat = await ChatService.findChat([user_id_1, user_id_2])
    if (!chat) return res.status(200).json({ chat: [] })

    return res.status(200).json({ chat: chat.messages })
  } catch (err) {
    if (isServiceError(err)) return res.status(err.status).json({ message: err.message })

    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const ChatController = { show }
