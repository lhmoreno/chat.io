import { QueueRepository } from '../repositories/QueueRepository'

import { ServiceError } from '../..'

async function createQueue(user_id: string, chat_id: string, message_id: string) {
  // Create a message in an existing queue
  try {
    const queue = await QueueRepository.findQueueByUserId(user_id)

    if (queue) return await QueueRepository.createMessageByQueue(queue, { chat_id, message_id })
  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service create queue 1'
    } as ServiceError
  }

  // Create a queue
  try {
    const newQueue = await QueueRepository.createQueue(user_id, { chat_id, message_id })
    if (newQueue.chats[0].messages) return newQueue.chats[0].messages[0]
  } catch (err) {
    throw { 
      status: 500, 
      error: 'Internal server error', 
      message_server: 'ERROR: Service create queue 2'
    } as ServiceError
  }

  throw { 
    status: 500, 
    error: 'Internal server error', 
    message_server: 'ERROR: Service create queue 3'
  } as ServiceError
}

async function findQueueByUserId(user_id: string) {
  try {
    const queue = await QueueRepository.findQueueByUserId(user_id)

    if (queue) return queue.chats
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

export const QueueService = { createQueue, findQueueByUserId }
