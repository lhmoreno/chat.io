import { Schema, model } from 'mongoose'

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
    required: true
  }
})

const ChatSchema = new Schema<Chat>({
  users: {
    type: [Schema.Types.ObjectId, Schema.Types.ObjectId],
    ref: 'User',
    required: true,
    unique: true
  },

  messages: {
    type: [MessageSchema],
    required: true
  }
})

export const ChatModel = model<Chat>('Chat', ChatSchema)
