import { UserRepository } from '../repositories/UserRepository'
import { ChatRepository } from '../repositories/ChatRepository'

import { Message, MessageStatus, ServiceError, StaticUser } from '../types'
import { serverIo } from '..'
import { redis } from '../config/databases/redis'
interface CreateMessage {
  user_id: string
  text: string
  hour: string
}

async function createMessageByUsersIds(user_id_1: string, user_id_2: string, message: CreateMessage) {
  // Create a message in an existing chat
  try {
    const chat = await ChatRepository.findChatByUsersIds(user_id_1, user_id_2)

    if (chat) {
      const data = await redis.get(user_id_2) as string | undefined
      
      if (data) {
        const { socket_id, chat_active } = JSON.parse(data) as StaticUser
        if (chat_active === String(chat._id)) {
          const message_db = await ChatRepository.createMessageByChat(chat, { ...message, status: MessageStatus.viewed })
          serverIo.to(String(socket_id)).emit('MESSAGE', {
            message_id: message_db._id,
            user_id: message_db.user_id,
            text: message_db.text,
            hour: message_db.hour,
            status: message_db.status
          })
  
          return message_db
        } else {
          const message_db = await ChatRepository.createMessageByChat(chat, { ...message, status: MessageStatus.received })
          serverIo.to(String(socket_id)).emit('MESSAGE', {
            message_id: message_db._id,
            user_id: message_db.user_id,
            text: message_db.text,
            hour: message_db.hour,
            status: message_db.status
          })

          const user = await UserRepository.findUser(user_id_2) 
          await UserRepository.createUnreadByUser(user, user_id_1)
  
          return message_db
        }
      } else {
        const newMessage = await ChatRepository.createMessageByChat(chat, message)

        const user = await UserRepository.findUser(user_id_2) 
        await UserRepository.createUnreadByUser(user, user_id_1)

        return newMessage 
      }
    }
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
    const data = await redis.get(user_id_2) as string | undefined
    
    if (data) {
      const { socket_id } = JSON.parse(data) as StaticUser
      const newChat = await ChatRepository.createChat(user_id_1, user_id_2, { ...message, status: MessageStatus.received})

      serverIo.to(String(socket_id)).emit('MESSAGE', {
        message_id: newChat.messages[0]._id,
        user_id: newChat.messages[0].user_id,
        text: newChat.messages[0].text,
        hour: newChat.messages[0].hour,
        status: newChat.messages[0].status
      })

      const user = await UserRepository.findUser(user_id_2) 
      await UserRepository.createUnreadByUser(user, user_id_1)

      return newChat.messages[0]
    }
    
    const newChat = await ChatRepository.createChat(user_id_1, user_id_2, message)

    const user = await UserRepository.findUser(user_id_2) 
    await UserRepository.createUnreadByUser(user, user_id_1)
  
    return newChat.messages[0]
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

    if (chat) {
      const data = await redis.get(user_id_1) as string | undefined
      if (data) {
        const newData = JSON.parse(data) as StaticUser
        newData.chat_active = chat._id
        await redis.set(user_id_1, JSON.stringify(newData))
      }


      const unreadMessages: Message[] = chat.messages.filter(({ status, user_id }) => status !== MessageStatus.viewed && user_id === user_id_2)
  
      if (unreadMessages.length === 0) return chat.messages
  
  
      const newChat = chat
      chat.messages.forEach((message, index) => {
        if (message.status !== MessageStatus.viewed) {
          return newChat.messages[index] = { ...message, status: MessageStatus.viewed }
        }
  
        return newChat.messages[index] = message
      })

      await ChatRepository.updateChatStatus(newChat)
      await UserRepository.updateUnreadByUsersIds(user_id_1, user_id_2)
  
      return newChat.messages
    }
  } catch (err) {
    if (err && typeof(err) === 'object' && Object.keys(err).length === 0) {
      throw { 
        status: 400, 
        error: 'Invalid user'
      } as ServiceError
    }

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
