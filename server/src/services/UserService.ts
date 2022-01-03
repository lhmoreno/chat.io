import { sign, verify } from 'jsonwebtoken'

import { UserRepository } from '../repositories/UserRepository'
import { utils } from '../validators/utils'

import { MessageStatus, ServiceError } from '../..'
import { ChatRepository } from '../repositories/ChatRepository'

const { APP_SECRET } = process.env

async function createUser(name: string) {
  try {
    return await UserRepository.createUser(name)
  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service create user'
    } as ServiceError
  }
}

async function createToken(user_id: string) {
  try {
    return sign({ user_id }, APP_SECRET)
  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service create token'
    } as ServiceError
  }
}

async function updateNameUser(user_id: string, newName: string) {
  try {
    return await UserRepository.updateNameUser(user_id, newName)
  } catch (err) {
    if (err === {}) {
      throw { 
        status: 400, 
        error: 'Invalid user or name'
      } as ServiceError
    }

    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service update name user'
    } as ServiceError
  }
}

async function findUser(user_id: string) {
  try {
    const user = await UserRepository.findUser(user_id)

    // Status message received
    const chats = user.unread.filter((unread) => unread.count > 0)

    const promises = chats.map(async (unread) => {
      const chat = await ChatRepository.findChatByUsersIds(user_id, unread.user_id)

      if (chat) {
        const newChat = chat
        chat.messages.forEach((message, index) => {
          if (message.status === MessageStatus.sent) {
            return newChat.messages[index] = { ...message, status: MessageStatus.received }
          }
  
          return newChat.messages[index] = message
        })
  
        await ChatRepository.updateChatStatus(newChat)
      }
    })

    await Promise.all(promises)

    return user
  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service find user'
    } as ServiceError
  }
}

async function findUserIdByToken(token: string) {
  try {
    const decode = verify(token, APP_SECRET)

    if (utils.isJwtPayload(decode)) return decode.user_id
  } catch (err) {
    if (utils.isJsonWebTokenError(err)) {
      throw { 
        status: 401, 
        error: 'Invalid token'
      } as ServiceError
    }

    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service find user_id by token'
    } as ServiceError
  }

  throw { 
    status: 401, 
    error: 'Invalid token'
  } as ServiceError
}

async function findAllUsersBut(user_id: string) {
  try {
    return await UserRepository.findAllUsersBut(user_id)
  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service find all users but'
    } as ServiceError
  }
}

export const UserService = { createUser, createToken, findUser, updateNameUser, findUserIdByToken, findAllUsersBut }
