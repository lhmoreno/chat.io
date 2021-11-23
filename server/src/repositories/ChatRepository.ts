import { ChatModel } from '../models/Chat'

async function createChat(users: Chat['users']) {
  const document = await ChatModel.create({ users, messages: [] })
  return document.id as IdMongo
}

async function updateChat(chat_id: IdMongo, newChat: Chat) {
  return await ChatModel.findOneAndUpdate({ id: chat_id }, newChat).lean()
}

async function findChat(chat_id: IdMongo) {
  return await ChatModel.findOne({ id: chat_id }).lean()
}

export const ChatRepository = { createChat, updateChat, findChat }
