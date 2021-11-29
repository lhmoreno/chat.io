import { QueueModel } from '../models/QueueModel'

import { QueueUser } from '../..'

interface CreateQueue {
  chat_id: string
  message_id: string
}

async function createQueue(user_id: string, queue: CreateQueue) {
  const document = new QueueModel({
    user_id,
    chats: [{ chat_id: queue.chat_id, messages: [queue.message_id] }]
  })

  const chats = document.chats

  await document.save()

  return { user_id, chats } as QueueUser
}

async function createMessageByQueue(queue: QueueUser, newMessage: CreateQueue) {
  const messages = queue.chats.find(({ chat_id }) => chat_id === newMessage.chat_id)
  if (!messages || !messages.messages) throw {}

  const document = new QueueModel({ 
    user_id: queue.user_id,
    chats: [...queue.chats, { chat_id: messages.chat_id, messages: [...messages.messages, newMessage] }]
  })

  await QueueModel.updateOne({ chat_id: messages.chat_id }, document)

  return newMessage.message_id
}

async function findQueueByUserId(user_id: string) {
  const queue = await QueueModel.findOne({ user_id }).lean()
  if (!queue) return null

  return queue
}

export const QueueRepository = { createQueue, createMessageByQueue, findQueueByUserId }
