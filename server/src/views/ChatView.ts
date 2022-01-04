import { Message } from '../types'

function renderMessage(message: Message) {
  return {
    message_id: message._id,
    user_id: message.user_id,
    text: message.text,
    hour: message.hour,
    status: message.status
  }
}

function renderManyMessages(chat: Message[]) {
  return chat.map((message) => renderMessage(message))
}

export const ChatView = { renderMessage, renderManyMessages }
