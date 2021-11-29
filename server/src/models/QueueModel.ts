import { Schema, model } from 'mongoose'

import { QueueUser, QueueMessages } from '../..'

const ChatSchema = new Schema<QueueMessages>({
  chat_id: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
    required: true,
    unique: true
  },

  messages: {
    type: [Schema.Types.ObjectId],
    required: true
  }
})

const QueueSchema = new Schema<QueueUser>({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true
  },

  chats: {
    type: [ChatSchema],
    required: true
  }
})

export const QueueModel = model<QueueUser>('Queue', QueueSchema)
