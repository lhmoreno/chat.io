import { ChatRepository } from '../repositories/ChatRepository'

// async function createChat(chat_id: IdMongo, message: Message) {
//   try {
//     const chat = await ChatRepository.findChat(chat_id)
//     if (!chat) {
//       await ChatRepository.createChat(chat_id, message)
//     } else {
//       await ChatRepository.updateChat({ chat_id: chat._id, newChat })
//       const newChat = { users: chat.users, messages: chat.messages }
//       newChat.messages.push(message)
//     }

//     return message
//   } catch (err) {
//     throw { status: 500, message: 'Internal server error' } as ServiceError
//   }
// }

async function createMessage(chat_id: IdMongo, message: Message) {
  try {
    const chat = await ChatRepository.findChat(chat_id)
    if (!chat) await 
    // if (!chat) {
    //   await ChatRepository.createChat(chat_id, message)
    // } else {
    //   await ChatRepository.updateChat({ chat_id: chat._id, newChat })
    //   const newChat = { users: chat.users, messages: chat.messages }
    //   newChat.messages.push(message)
    // }

    // return message
  } catch (err) {
    throw { status: 500, message: 'Internal server error' } as ServiceError
  }
}

async function findChat(users: Chat['users']) {
  const document = await ChatRepository.findChat(users)
  if (!document) return null

  const chat = document.toObject()

  return chat
}

export const ChatService = { createMessage, findChat }
