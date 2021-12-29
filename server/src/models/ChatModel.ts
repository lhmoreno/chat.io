import { Schema, model } from 'mongoose'

import { Message, MessageStatus, Chat } from '../..'

const MessageSchema = new Schema<Message>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true

      }, 
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
    required: true
  },

  messages: {
    type: [MessageSchema],
    required: true
  }
})

export const ChatModel = model<Chat>('Chat', ChatSchema)
