import { Schema, model } from 'mongoose'

const ChatSchema = new Schema<QueueChat>({
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
}, { _id: false })

const QueueSchema = new Schema<Queue>({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true
  },

  chats: {
    type: [ChatSchema],
    required: true
  }
}, { _id: false })

export const QueueModel = model<Queue>('Queue', QueueSchema)
