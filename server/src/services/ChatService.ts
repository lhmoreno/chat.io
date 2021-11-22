import { ServiceError } from '../@types'
import { ChatModelProps } from '../models/Chat'

import { ChatRepository, CreateChatProps } from '../repositories/ChatRepository'

async function createMessage({ users, message }: CreateChatProps) {
  try {
    const chat = await ChatRepository.findChat(users)
    if (!chat) {
      await ChatRepository.createChat({ users, message })
    } else {
      const newChat = { users: chat.users, messages: chat.messages }
      newChat.messages.push(message)
      await ChatRepository.updateChat({ chat_id: chat._id, newChat })
    }

    return message
  } catch (err) {
    throw { status: 500, message: 'Internal server error' } as ServiceError
  }
}

async function findChat(users: ChatModelProps['users']) {
  const document = await ChatRepository.findChat(users)
  if (!document) return null

  const chat = document.toObject()

  return chat
}

export const ChatService = { createMessage, findChat }
