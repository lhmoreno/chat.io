import { ChatModelProps, MessageModelProps, ChatModel } from '../models/Chat'

export interface CreateChatProps {
  users: ChatModelProps['users']
  message: MessageModelProps
}

export interface UpdateChatProps {
  chat_id: string
  newChat: ChatModelProps
}

async function createChat({ users, message }: CreateChatProps) {
  const document = await ChatModel.create({ users, messages: [message] })

  const chat = document.toObject()

  return chat
}

async function updateChat({ chat_id, newChat }: UpdateChatProps) {
  const chat = await ChatModel.findOneAndUpdate({ id: chat_id }, newChat).lean()
  if (!chat) return null

  return chat
}

async function findChat(users: ChatModelProps['users']) {
  const chat = await ChatModel.findOne({ users })
  if (!chat) return null

  return chat
}

export const ChatRepository = { createChat, updateChat, findChat }
