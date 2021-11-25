import { ChatModel } from '../models/ChatModel'

import { Chat, MessageStatus } from '../..'

interface CreateMessage {
  user_id: string
  text: string
  hour: string
  status?: MessageStatus
}

async function createChat(user_id_1: string, user_id_2: string, message: CreateMessage) {
  const document = new ChatModel({
    users: [user_id_1, user_id_2],
    messages: [message]
  })

  const _id = document._id as string
  const users = document.users
  const messages = document.messages
  const __v = document.__v as number

  await document.save()

  return { _id, users, messages, __v } as Chat
}

async function createMessageByChat(chat: Chat, newMessage: CreateMessage) {
  const document = new ChatModel({ 
    _id: chat._id,
    users: chat.users,
    messages: [...chat.messages, newMessage],
    __v: chat.__v
  })

  const last = document.messages.length - 1
  const message = document.messages[last]

  await ChatModel.updateOne({ _id: chat._id }, document)

  return message
}

async function findChatByUsersIds(user_id_1: string, user_id_2: string) {
  const chat = await ChatModel.findOne({ users: [user_id_1, user_id_2] }).lean()
  if (!chat) return null

  return chat
}

export const ChatRepository = { createChat, createMessageByChat, findChatByUsersIds }
