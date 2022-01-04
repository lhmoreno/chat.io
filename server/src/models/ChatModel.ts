import { Schema, model } from 'mongoose'

import { Message, MessageStatus, Chat } from '../types'

const MessageSchema = new Schema<Message>({
  user_id: {
    type: String,
    required: true
  },

  text: {
    type: String,
    required: true
  },

  hour: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: MessageStatus,
    default: MessageStatus.sent,
    required: true
  }
})

const ChatSchema = new Schema<Chat>({
  users: {
    type: [String, String],
    required: true
  },

  messages: {
    type: [MessageSchema],
    required: true
  }
})

export const ChatModel = model<Chat>('Chat', ChatSchema)
