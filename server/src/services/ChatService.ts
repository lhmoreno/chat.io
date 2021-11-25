import { UserRepository } from '../repositories/UserRepository'
import { ChatRepository } from '../repositories/ChatRepository'

import { ServiceError } from '../..'

interface CreateMessage {
  user_id: string
  text: string
  hour: string
}

async function createMessageByUsersIds(user_id_1: string, user_id_2: string, message: CreateMessage) {
  // Create a message in an existing chat
  try {
    const chat = await ChatRepository.findChatByUsersIds(user_id_1, user_id_2)

    if (chat) return await ChatRepository.createMessageByChat(chat, message)
  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service create message by users ids'
    } as ServiceError
  }

  // Check if users exist
  try {
    const user_1 = await UserRepository.existsUser(user_id_1)
    const user_2 = await UserRepository.existsUser(user_id_2)

    if (!user_1 || !user_2) throw {}
  } catch (err) {
    throw { 
      status: 409, 
      error: 'Invalid users', 
    } as ServiceError
  }

  // Create a chat
  try {
    const newChat = await ChatRepository.createChat(user_id_1, user_id_2, message)
    const last = newChat.messages.length - 1
  
    return newChat.messages[last]
  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service create message by users ids'
    } as ServiceError
  }
}

async function findMessagesByUsersIds(user_id_1: string, user_id_2: string) {
  try {
    const chat = await ChatRepository.findChatByUsersIds(user_id_1, user_id_2)

    if (chat) return chat.messages
  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service find messages by users ids'
    } as ServiceError
  }

  throw { 
    status: 400, 
    error: 'Invalid user'
  } as ServiceError
}

export const ChatService = { createMessageByUsersIds, findMessagesByUsersIds }
